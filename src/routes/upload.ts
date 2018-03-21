import * as fs from 'fs';
import * as Boom from 'boom';
import * as uuid from 'uuid';

const UPLOAD_PATH = 'uploads';
const fileOptions = { dest: `${UPLOAD_PATH}/`, fileFilter: null };

const _fileHandler = function (file, options) {
    if (!file) throw new Error('no file');

    if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);

    if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
        throw new Error('type not allowed');
    }

    const orignalname = file.hapi.filename;
    const filename = uuid.v1();
    const path = `${options.dest}${filename}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', function (err) {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            };

            resolve(fileDetails);
        })
    })
};

const uploader = function (file, options) {
    if (!file) throw new Error('no file(s)');

    // update this line to accept single or multiple files
    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};

const _filesHandler = function (files, options) {
    if (!files || !Array.isArray(files)) throw new Error('no files');

    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
};

export const UPLOAD_ROUTE = {
    method: 'POST',
    path: '/submissions',
    options: {
        auth: 'token',
        payload: {
            output: 'stream',
            allow: 'multipart/form-data'
        }
    },
    handler: async (request, reply) => {
        try {
            const data = request.payload;
            const assignmentId = data['assignmentId'];
            const file = data['file'];
            const fileDetails = await uploader(file, fileOptions);
            console.log(assignmentId);
            reply(`Saved file: ${fileDetails['filename']}`);
        } catch (err) {
            reply(Boom.badRequest(err.message, err));
        }
    },
};