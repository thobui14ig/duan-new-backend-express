#1 Backend:
    ##1.Cài đặt database.
        ##-Download monggo commpass: https://www.mongodb.com/try/download/compass
        ##-Kết nối mongo compass: mongodb+srv://root:root@cluster0.0aue7m9.mongodb.net
    ##2.Run: yarn start:dev

#2 Frontend:
    ##1.Run: yarn start

##Cấu trúc database như sau:
    ##-Team(1 team chứa nhiều project), 
    ##-project(1 project chỉ thuộc 1 team), 
    ##-section(1 section thuộc 1 project), 
    ##-task(1 task thuộc nhiều section), 
    ##-comment...(Tất cả nằm trong conllection resources)

##Cấu trúc conllection resources gồm các trường chính sau:
```ts
    {
        name: string,
        resource_type: string,
        created_by: string,
        created_at: Date,
        updated_at: Date,
        ...
    }
    ##-Ví dụ tạo 1 Team mới thì có cấu trúc nhưu sau
        {
            _id: 123123213,
            name: 'Team 1',
            resource_type: 'team',
            created_by: '123131',
            created_at: 20-12-2019,
            updated_at: 20-12-2019,
            projects: [
                43545645342,
                ...
            ]
        }

    ##-Ví dụ tạo 1 Project mới thì có cấu trúc nhưu sau
        {
            _id: 43545645342,
            name: 'Project 1',
            resource_type: 'project',
            created_by: '123131',
            created_at: 20-12-2019,
            updated_at: 20-12-2019,
            team: '123123213' //la id cua team ở trên
            sections: [
                6345435435,
                ....
            ]
        }

    ##-Ví dụ tạo 1 Project mới thì có cấu trúc nhưu sau
        {
            _id: 6345435435,
            name: 'Section 1',
            resource_type: 'section',
            created_by: '123131',
            created_at: 20-12-2019,
            updated_at: 20-12-2019,
            project: '43545645342' //la id cua project ở trên
        }

    ##TƯơng tự với task và comment.