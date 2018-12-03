export interface Group {
    groupIndex: number,
    groupMasterId: string,
    groupName: string,
    members: string[],
}

export interface GroupBoard {
    groupBoardIndex: number,
    groupIndex: number,
    groupName: string,
    groupBoardTitle: string,
    groupBoardContent: string,
    groupBoardPosterId: string,
    groupBoardDate: string,
    file?: File,
}