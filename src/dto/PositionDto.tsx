export interface PositionDto {
    name: string,
    id: string,
    detail: string,
    status: PositionStatusEnum,
    city: string,
    workType: WorkTypeEnum,
    applicantCount: number
}

export interface PositionsApplyDto {
    id: string,
    name: string,
    tckn: string,
    surname: string,
    email: string,
    phone: string,
    city: string,
    positionId: string,
    hrApprovalStatus: ApprovalStatus,
    hrApprovalMessage: string,
    techinalApprovalStatus: ApprovalStatus,
    techinalApprovalMessage: string,
    financeApprovalStatus: ApprovalStatus,
    financeApprovalMessage: string

}

export enum PositionStatusEnum {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED'
}

export enum WorkTypeEnum {
    REMOTE = 'REMOTE',
    OFFICE = 'OFFICE',
    HYBRID = 'HYBRID'
}

export enum ApprovalStatus {
    WAITING = 'WAITING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface ApproveDto {
    status: ApprovalStatus,
    message: string
}

