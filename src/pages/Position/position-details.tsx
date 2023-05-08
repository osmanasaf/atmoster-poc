import {Text} from "@mantine/core";
import React, {useEffect} from "react";
import {getAllPosition} from "../../service/auth.service";

const PositionDetails = () => {
    const url = window.location.pathname;
    const positionID = url.split('/')[3];

    useEffect(() => {
        getAllPosition(positionID).then((res) => {
            const position = res
        })
    })
    return (
        <div>
            <Text align="center" weight={700} size="lg">
                Açık pozisyon {positionID}
            </Text>
        </div>
    )

}
export default PositionDetails;

