import { google } from 'googleapis'
import * as fs from 'fs'
import * as path from 'path'

class GoogleApi{
    CLIENT_ID = process.env.CLIENT_ID
    CLIENT_SECRET = process.env.CLIENT_SECRET
    REDIRECT_URI = process.env.REDIRECT_URI
    REFRESH_TOKEN = process.env.REFRESH_TOKEN
    oauth2CLient: any
    drive: any

    constructor(){
        // console.log(1111,this.CLIENT_ID)
        // console.log(1111, this.CLIENT_SECRET) 
        // console.log(1111, this.REDIRECT_URI)


        // console.log(1111, process.env.REFRESH_TOKEN)
        this.oauth2CLient = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI)
        this.oauth2CLient.setCredentials({
            refresh_token: this.REFRESH_TOKEN,
        })
        this.drive = google.drive({
            version: 'v3', 
            auth: this.oauth2CLient
        })
    }

    async uploadFile() {
        try{
            const file = fs.createReadStream(path.join(__dirname, './cr7.jpeg'))
            fs.readFile(file.path, async(err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
          
                // Convert the file to a Base64 encoded string.
                const encodedData = new Buffer(data).toString('base64');
                const createFile = await this.drive.files.create({
                    requestBody: {
                        name: 'thobo.jpg',
                        mimeType: 'image/jpg'
                    },
                    media: {
                        mimeType: 'image/jpg',
                        body: encodedData
                    }
                })
              });



        }catch(err){
            console.log(1111, err)
        }

    }
}

export default GoogleApi