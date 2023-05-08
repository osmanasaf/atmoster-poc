import React, {useEffect, useState} from "react";
import {getPosition, getRecourseDetail, getRequest} from "../../service/auth.service";
import {Table, Text, TextInput} from "@mantine/core";
import {Modal} from 'antd'

interface positionDto {
    id: number
    positionName: string
    numberOfRecourse: number
    title: string
}

interface positionDetail {
    id?: number
    positionName?: string
    numberOfRecourse?: number
    title?: string
    user?: User[]
}

interface User {
    id: number,
    name: string,
    surname: string,
    age: number
}


const HrUser = () => {
    const [position, setPosition] = useState<positionDto[]>([]);
    const [positionDetail, setPositionDetail] = useState<positionDetail>();
    const [recourseDetail, setRecourseDetail] = useState<User>();
    const [isRecoursesModalVisible, setRecoursesModalVisible] = useState(false);
    const [isRecourseDetailModalVisible, setIsRecourseDetailModalVisible] = useState(false);
    const [explanation, setExplanation] = useState('');


    useEffect(() => {
        getRequest().then((res: any) => setPosition(res));
    }, [])

    function positionDetails(positionId: number) {
        setRecoursesModalVisible(true)
        setPositionDetail({user: [{id: 1, name: 'iko', surname: 'aşkar', age: 26}]})
        useEffect(() => {
            getPosition(positionId).then((res: any) => {
                setPositionDetail(res)
            })
        })
    }

    function recourseDetails(userId: number) {
        setRecourseDetail({id: 1, name: 'iko', surname: 'aşkar', age: 26})
        setRecoursesModalVisible(false)
        setIsRecourseDetailModalVisible(true)
        useEffect(() => {
            getRecourseDetail(userId).then((res: any) => {
                setRecourseDetail(res)
            })
        })
    }

    function handleHide() {
        setRecoursesModalVisible(false)
        setIsRecourseDetailModalVisible(false)

    }

    function recourseSave() {
        setRecoursesModalVisible(false)
        setIsRecourseDetailModalVisible(false)
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
                {position?.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => positionDetails(item.id)}>{item.title}</td>
                        <td>{item.positionName}</td>
                        <td>{item.numberOfRecourse}</td>
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
                {positionDetail?.user?.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => recourseDetails(item.id)}>{item.name}</td>
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
                    <td>{recourseDetail?.age}</td>
                </tr>


                <form
                    style={{display: "flex", flexDirection: "column", maxWidth: "300px"}}
                >
                    <TextInput
                        label="Explanation"
                        value={explanation}
                        onChange={(e) => setExplanation(e.currentTarget.value)}
                        required
                        style={{marginBottom: "8px"}}
                    />
                </form>

                </tbody>
            </Modal>
        </div>

    );
}

export default HrUser;

