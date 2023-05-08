import React, {useEffect, useState} from "react";
import {Button, Switch, Table, Text, TextInput} from "@mantine/core";
import {Modal} from 'antd'
import {ApprovalStatus, ApproveDto, PositionsApplyDto} from "../../dto/PositionDto"
import {getPositionApplies, openPositions, updateUserUcretlendirmePersonel} from "../../service/position.service";

const UcretlendirmePersonelUser = () => {
    const [position, setPosition] = useState<PositionsApplyDto[]>([]);
    const [positionDetail, setPositionDetail] = useState<PositionsApplyDto[]>();
    const [recourseDetail, setRecourseDetail] = useState<PositionsApplyDto>();
    const [isRecoursesModalVisible, setRecoursesModalVisible] = useState(false);
    const [isRecourseDetailModalVisible, setIsRecourseDetailModalVisible] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [changeSwitch, setChangeSwitch] = useState(true);
    const [approveUser, setApproveUser] = useState<ApproveDto>()

    useEffect(() => {
        openPositions().then((res: any) => setPosition(res));
    }, [])

    function positionDetails(positionId: string) {
        setRecoursesModalVisible(true)
        getPositionApplies(positionId).then((res: any) => {
            setPositionDetail(res)
        })
    }

    function recourseDetails(userId: string) {
        setRecoursesModalVisible(false)
        setIsRecourseDetailModalVisible(true)
        const selectedUser = positionDetail?.find((user) => user.id == userId);
        setRecourseDetail(selectedUser)
    }

    function handleHide() {
        setRecoursesModalVisible(false)
        setIsRecourseDetailModalVisible(false)

    }

    function recourseSave() {
        setRecoursesModalVisible(false)
        setIsRecourseDetailModalVisible(false)
    }

    const handleSwitchChange = () => {
        setChangeSwitch(!changeSwitch);
    }

    function saveUser() {
        setApproveUser({status: changeSwitch ? ApprovalStatus.APPROVED : ApprovalStatus.REJECTED, message: explanation})
        if (recourseDetail && approveUser) {
            updateUserUcretlendirmePersonel(recourseDetail.id, approveUser).then((res: any) => {
            })
        }
    }

    return (
        <div>
            <Text align="center" weight={700} size="lg">
                Açık Pozisyonlar
            </Text>

            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>Pozisyon Adı</th>
                    <th>İK Aşamasına Geçmiş Başvuru Sayısı</th>
                </tr>
                </thead>
                <tbody>
                {position?.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => positionDetails(item.id)}>{item.name}</td>
                        <td>{item.hrApprovalStatus}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal title="Başvuran Listesi" visible={isRecoursesModalVisible} onCancel={handleHide}>
                <thead>
                <tr>
                    <th>İsim</th>
                    <th>Soyisim</th>
                </tr>
                </thead>
                <tbody>
                {positionDetail?.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => recourseDetails(item.id)}>{item.email}</td>
                        <td>{item.surname}</td>
                    </tr>
                ))}
                </tbody>
            </Modal>

            <Modal title="Başvuran Detay" visible={isRecourseDetailModalVisible} onOk={recourseSave}
                   onCancel={handleHide}>
                <thead>
                <tr>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th>Yaş</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{recourseDetail?.name}</td>
                    <td>{recourseDetail?.surname}</td>
                    <td>{recourseDetail?.phone}</td>
                </tr>


                <form
                    style={{display: "flex", flexDirection: "column", maxWidth: "300px"}}
                >
                    <Switch checked={changeSwitch} onChange={handleSwitchChange}/>

                    <TextInput
                        label="Explanation"
                        value={explanation}
                        onChange={(e) => setExplanation(e.currentTarget.value)}
                        required
                        style={{marginBottom: "8px"}}
                    />
                </form>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={saveUser} type="submit">Kaydet</Button>
                </div>

                </tbody>
            </Modal>
        </div>

    );
}

export default UcretlendirmePersonelUser;

