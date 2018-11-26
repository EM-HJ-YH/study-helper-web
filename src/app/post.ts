export interface Post{
    postNo: number,
    title: string,
    writer: string,
    date: string,
    contents: string,
    maxNum: number,
    applicant?: string[],
    file?: File,
};
