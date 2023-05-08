import React, {useEffect, useState} from "react";
import {Button, Switch, Table, Text, TextInput} from "@mantine/core";
import {Modal} from 'antd'
import {ApprovalStatus, ApproveDto, PositionDto, PositionsApplyDto} from "../../dto/PositionDto"
import {
    getPositionApplies, getPositionAppliesFinancial,
    openPositions,
    updateUserTechnical,
    updateUserUcretlendirmePersonel
} from "../../service/position.service";

const UcretlendirmePersonelUser = () => {
    const [position, setPosition] = useState<PositionDto[]>([]);
    const [positionDetail, setPositionDetail] = useState<PositionsApplyDto[]>();
    const [recourseDetail, setRecourseDetail] = useState<PositionsApplyDto>();
    const [isRecoursesModalVisible, setRecoursesModalVisible] = useState(false);
    const [isRecourseDetailModalVisible, setIsRecourseDetailModalVisible] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [changeSwitch, setChangeSwitch] = useState(true);
    const [approveUser, setApproveUser] = useState<ApproveDto>()

    useEffect(() => {
        openPositions().then((res: any) => setPosition(res.data));
    }, [])

    function positionDetails(positionId: string) {
        setRecoursesModalVisible(true)
        getPositionAppliesFinancial(positionId).then((res: any) => {
            setPositionDetail(res.data)
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
                setIsRecourseDetailModalVisible(false)
                openPositions().then((res: any) => setPosition(res.data));
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
                    <th>Başvuru Sayısı</th>
                </tr>
                </thead>
                <tbody>
                {position.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => positionDetails(item.id)}>{item.name}</td>
                        <td>{item.applicantCount}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal title="Başvuran Listesi" visible={isRecoursesModalVisible} onCancel={handleHide}>
                <thead>
                <tr>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {positionDetail?.map((item) => (
                    <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{item.surname}</td>
                        <td><Button type="submit" onClick={() => recourseDetails(item.id)}>
                            Detay
                        </Button></td>
                    </tr>
                ))}
                </tbody>
            </Modal>

            <Modal title="Başvuran Detay" visible={isRecourseDetailModalVisible} onOk={saveUser}
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
                </tbody>
                <div>
                    <label htmlFor=""> Onay/Red</label>
                    <Switch checked={changeSwitch} onChange={handleSwitchChange}/>
                    <TextInput
                        label="Explanation"
                        value={explanation}
                        onChange={(e) => setExplanation(e.currentTarget.value)}
                        required
                        style={{marginBottom: "8px"}}
                    />
                </div>
            </Modal>
        </div>

    );
}

export default UcretlendirmePersonelUser;

