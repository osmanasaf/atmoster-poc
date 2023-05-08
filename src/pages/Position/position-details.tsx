import {getIdPosition} from "../../service/position.service";
import {useEffect, useState} from "react";
import {PositionDto} from "../../dto/PositionDto";
import {Table} from "@mantine/core";

const PositionDetails = () => {
    const [position, setPosition] = useState<PositionDto>();
    const positionID = window.location.pathname.split('/')[3];
    useEffect(() => {
        getIdPosition(positionID).then((res: any) => {
            setPosition(res.data)
        });
    }, [])

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    marginRight: "25px",
                    marginLeft: "10px"
                }}
            >
            </div>
            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>Pozisyon Adı</th>
                    <th>Şehir</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{position?.name}</td>
                    <td>{position?.city}</td>
                    <td>{position?.status}</td>
                </tr>
                </tbody>
            </Table>

        </div>
    );
}
export default PositionDetails;

