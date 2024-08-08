const Directory = require('../../src/models/Directory');
const DirectoryService = require('../../src/services/DirectoryService');
const Logger = require('../../src/utils/logger');

jest.mock('../../src/utils/Logger');

describe('DirectoryService - create method', () => {
  let directoryService;
  let mockLogger;

  beforeEach(() => {
    mockLogger = new Logger();
    directoryService = new DirectoryService(new Directory('/'), mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new directory successfully', () => {
    directoryService.create('/fruits');
    expect(directoryService.root.children.has('fruits')).toBeTruthy();
  });

  it('should create nested directories successfully', () => {
    directoryService.create('/fruits');
    directoryService.create('/fruits/apples');
    directoryService.create('/fruits/apples/fuji');

    expect(directoryService.root.children.get('fruits').children.get('apples').children.has('fuji')).toBeTruthy();
  });

  it('should log an error when parent directory does not exist', () => {
    jest.spyOn(mockLogger, 'logError');

    directoryService.create('/nonexistent/apples');
    expect(mockLogger.logError).toHaveBeenCalledWith('CREATE_ERROR', '/nonexistent/apples', 'No such directory');
  });

  it('should return error when directory already exists', () => {
    directoryService.create('/fruits');
    directoryService.create('/fruits');
    expect(mockLogger.logError).toHaveBeenCalledWith('CREATE_ERROR', '/fruits', 'Directory already exists');
  });

  it('should handle root directory creation', () => {
    directoryService.create('/');
    expect(mockLogger.logError).toHaveBeenCalledWith('CREATE_ERROR', '/', 'Directory already exists');
  });
});
