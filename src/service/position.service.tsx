import {getPosition, postPosition, putPositions} from "./base.service";
import {ApproveDto, PositionDto} from "../dto/PositionDto";


export const getAllPosition = () => {
    return getPosition('position/all-positions');
}

export const getIdPosition = (positionId: string) => {
    return getPosition(`position/get/${positionId}`);
}

export const createPosition = (positions: PositionDto) => {
    return postPosition('position', positions);
}

export const createPositionApply = (id: string) => {
    return postPosition(`position/id/${id}/apply`);
}
export const openPositions = () => {
    return getPosition('position/all-open-positions');
}

export const getPositionApplies = (positionID: string) => {
    return getPosition(`position/id/${positionID}/applies`)
}
export const getPositionAppliesFinancial = (positionID: string) => {
    return getPosition(`position/id/${positionID}/applies/financial`)
}

export const getPositionAppliesTechnical = (positionID: string | undefined) => {
    return getPosition(`position/id/${positionID}/applies/technical`)
}

export const updateUserHr = (userId: string, approve: ApproveDto) => {
    return putPositions(`position/position-apply/id/${userId}/hr-approve`, approve)
}

export const updateUserTechnical = (userId: string, approve: ApproveDto) => {
    return putPositions(`position/position-apply/id/${userId}/tech-approve`, approve)
}

export const updateUserUcretlendirmePersonel = (userId: string, approve: ApproveDto) => {
    return putPositions(`position/position-apply/id/${userId}/finance-approve`, approve)
}


export const updatePositionStatus = (positionId: string, status: string) => {
    return putPositions(`position/id/${positionId}/status/${status}`)
}
