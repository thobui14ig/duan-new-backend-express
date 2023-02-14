```ts
1.Backend:
    1.Cài đặt database.
        -Download monggo commpass: https://www.mongodb.com/try/download/compass
        -Kết nối mongo compass: mongodb+srv://root:root@cluster0.0aue7m9.mongodb.net
    2.Run: yarn start:dev

2.Frontend:
    1.Run: yarn start


Cấu trúc database như sau:
    ##-Team(1 team chứa nhiều project), 
    ##-project(1 project chỉ thuộc 1 team), 
    ##-section(1 section thuộc 1 project), 
    ##-task(1 task thuộc nhiều section), 
    ##-comment...(Tất cả nằm trong conllection resources)


Cấu trúc conllection resources gồm các trường chính sau:

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

    *Ứng dụng clone lại các tính năng của Asana, link mô tả hoạt động của asana https://www.tanca.io/blog/asana-la-gi-ung-dung-phan-mem-asana-de-quan-ly-cong-viec-va-du-an#:~:text=Asana%20l%C3%A0%20ph%E1%BA%A7n%20m%E1%BB%81m%20qu%E1%BA%A3n,thu%E1%BA%ADt%20c%E1%BB%A7a%20Facebook%20%2D%20Dustin%20Moskovitz. 

    *Các tính năng sẽ được thiết kế:
        -CRUD team, project, section, task, comment(Team sẽ là parent lớn nhất, trong team sẽ có nhiều project, trong project có nhiều section và trong section có nhiều task,  1 project chỉ thuộc 1 team, 1 section chỉ thuộc 1 project nhưng 1 task thì sẽ thuộc nhiều section)
        -Assignee công việc: Mỗi task được tạo ra sẽ được assignee cho 1 người

        -Chức năng bình luận trong task: Mỗi task sẽ có mục bình luận dạng như 1 bài viết của facebook.
        -Chức năng gửi đọc file: Ở bình luận trong task sẽ có chức năng gửi file có thể là img,doc,xlsx… cho các thành viện trong task có thể xem được.
        -Phân quyền: Chức năng này sẽ tạo quyền có các thành viên trong team, project và task chỉ có quyền crud mới có thể xem dc.
        -Inbox: Mỗi khi user được tag vào 1 bình luận thì sẽ có thông báo về inbox của user đó(chức năng Notification giống của facebook)


    *email và pass login Asana:(mấy đứa lưu ý chỉ vào xem giao diện để clone lại tuyệt đối không được bình luận và task đã có nhé.)
    email: buithanhtho114ig@gmail.com
    pass: Thanhtho96@

    // https://console.cloud.google.com/apis/credentials/consent?cloudshell=true&project=express-asa&supportedpurview=project
    // https://developers.google.com/oauthplayground