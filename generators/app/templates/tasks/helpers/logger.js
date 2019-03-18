import log from 'fancy-log';

export const errorLogger = (taskName = 'No taskname', file = 'No file', line = 'No line', msg = 'No msg', err) => {
  log.error(
    '[ Error ]' +
      '\n' +
      '---------------------------------------' +
      '\n  Task: ' +
      taskName +
      '\n Error: ' +
      msg +
      '\n  Line: ' +
      line +
      '\n  File: ' +
      file.replace(process.cwd(), '') +
      '\n' +
      '---------------------------------------' +
      '\n'
  );

  log.error(err);
};

export const infoLogger = (taskName, message) => {
  log.info(taskName, message);
};
