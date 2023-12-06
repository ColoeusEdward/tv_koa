/*
 * @Author: your name
 * @Date: 2021-04-24 07:54:23
 * @LastEditTime: 2023-08-30 07:54:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/util/util.js
 */

// const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const nodemailer = require('nodemailer');
const path = require('path');

let isIterable = obj => obj != null && typeof obj[Symbol.iterator] === 'function';

let buildFileDir = path => {
    console.log(path);
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    } else {
        console.log('clean');
        child_process.execSync(`rm -rf ${path}/*`)
    }
    return true
}

class FileDirBuilder {
    constructor(path) {
        this.path = path
    }
    build() {
        console.log(this.path);
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path);
            return 'first'
        }
    }
}
class AvatarFileDirBuilder extends FileDirBuilder {
    constructor(path) {
        super(path)
    }
    build() {
        if (super.build() == 'first') {
            console.log('clean');
            child_process.execSync(`rm -rf ${this.path
                }/*`)
        }
    }

}


let saveOneFile = file => { }

let saveImg = (files, netUrl, path) => {
    let netPath = []
    if (isIterable(files)) {
        for (var file of files) { // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 获取上传文件扩展名
            let filePath = path + `/${file.name
                }`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);

            // netPath.push(`https://meamoe.ga/koa/static/lost/${lost.lost_id}/${file.name}`)
            netPath.push(`${netUrl}/${file.name
                }`)
        }
    } else { // 创建可读流
        const reader = fs.createReadStream(files.path);
        // 获取上传文件扩展名
        let filePath = path + `/${files.name
            }`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);

        // netPath.push(`https://meamoe.ga/koa/static/lost/${lost.lost_id}/${files.name}`)
        netPath.push(`${netUrl}/${files.name
            }`)
    }
    return netPath
}

function deleteLostFile(id) {
    let lostPath = '/home/learn/koa/lexue/static/lost/'
    child_process.execSync(`rm -rf ${lostPath}${id}`)
}

function send_mail(text, email, title) {
    let transporter = nodemailer.createTransport({ // host: 'smtp.ethereal.email',
        service: 'gmail', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'a50541853@gmail.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'uxzhxcznaycftybk'
        }
    });

    let mailOptions = {
        from: (title || `新失物发布提醒`) + `<a50541853@gmail.com>`, // sender address
        to: `${email}`,
        // list of receivers
        // subject: 'Hello', // Subject line
        // 发送text或者html格式
        // text: `${text}`, // plain text body
        html: `<h2>${text.title
            }</h2><p>${text.name
            }</p><p>${text.descr
            }</p>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
}

function isFileExisted(path_way) {
    return new Promise((resolve, reject) => {
        fs.access(path_way, (err) => {
            if (err) {
                resolve(false); // "不存在"
            } else {
                resolve(true); // "存在"
            }
        })
    })
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// let fileDirBuilder = new FileDirBuilder()
// let avatarFileDirBuilder = new AvatarFileDirBuilder()

const secret = `wateryurban`

const getJSON = (dir) => {
    let pageJSON = fs.readFileSync(dir)
    return JSON.parse(pageJSON.toString())
}

const rowHeaderToObj = (str) => { // for talend api tester header copy
    let list = str.split('\n')
    let obj = list.map(e => {
        let l = e.split(`: `);
        let obj = {};
        obj[l[0]] = l[1];
        return obj
    }).reduce((a, b) => {
        return Object.assign(a, b)
    })
    return obj
}

const getStrFromNodeList = (srt) => {
    let nlist = document.querySelectorAll(str)
    let list = Array.from(nlist)
    let s = list.map(e => e.innerHTML.replace(/<[^>]+>/g, '')).join('\n')
    return s
}

function getFilesSortedByCreateDate(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);

        const fileStats = files.map((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            return {
                file,
                createdAt: stats.birthtimeMs,
            };
        });

        // Sort files by creation date
        const sortedFiles = fileStats.filter(e => e.file != 'dan').sort((a, b) => b.createdAt - a.createdAt);

        return sortedFiles;
    } catch (err) {
        console.error('Error reading directory:', err);
        return [];
    }
}

const sortByteNum = (snumber, byteList) => {
    let str = snumber.toString()
    let temp = Buffer.alloc(byteList.length)
    for (let i in str) {
        temp[i] = byteList[str[i] - 1]
    }
    return temp
}

const ajaxPromiseAll = (list) => {
    return new Promise((resolve, reject) => {
        return Promise.all(list).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
module.exports = {
    isIterable,
    buildFileDir,
    saveImg,
    FileDirBuilder,
    AvatarFileDirBuilder,
    deleteLostFile,
    send_mail,
    isFileExisted,
    sleep,
    secret,
    getJSON,
    rowHeaderToObj,
    getFilesSortedByCreateDate,
    sortByteNum,
    ajaxPromiseAll
}
