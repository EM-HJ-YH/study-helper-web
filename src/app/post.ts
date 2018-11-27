export interface Post{
    boardIndex: number,
    boardTitle: string,
    userId: string,
    boardDate: string,
    boardContent: string,
    memberCount: number,
    members: string[],
    isRecruiting: boolean,
    file?: File,
};

// export const POSTS: Post[] = [
//     {boardIndex: 1, boardTitle: "팀플 구합니다. 1", userId: "TEST@naver.com", boardDate: new Date().toString(), boardContent: "무슨 무슨 과목 팀플 팀원 구합니다.", memberCount: 10},
//     {boardIndex: 2, boardTitle: "팀플 구합니다. 2", userId: "aa@naver.com", boardDate: new Date().toString(), boardContent: "팀원 구해요!", memberCount: 7},
//     {boardIndex: 3, boardTitle: "팀플 구합니다. 3", userId: "bb@naver.com", boardDate: new Date().toString(), boardContent: "", memberCount: 10},
//     {boardIndex: 4, boardTitle: "팀플 구합니다. 4", userId: "cc@gmail.com", boardDate: new Date().toString(), boardContent: "", memberCount: 10},
//     {boardIndex: 5, boardTitle: "팀플 구합니다. 5", userId: "dd@gmail.com", boardDate: new Date().toString(), boardContent: "", memberCount: 10},
// ]