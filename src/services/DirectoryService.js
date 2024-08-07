const Directory = require('../models/Directory');
const DirectoryUtils = require('../utils/DirectoryUtils');
const Logger = require('../utils/Logger');

const logger = new Logger();

class DirectoryService {
  constructor() {
    this.root = new Directory('/');
  }

  /**
   * Creates a new directory at the specified path.
   * This method handles the following scenarios:
   * 1. Creating a new directory if it doesn't exist
   * 2. Returning an error if any parent directory in the path doesn't exist
   * 3. Returning an error if the directory already exists
   *
   * @param {string} path - The path where the new directory should be created
   * @returns {string} A message indicating the result of the operation
   */
  create(path) {
    const parts = DirectoryUtils.splitPath(path);
    let current = this.root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (!DirectoryUtils.checkIfDirectoryExists(current, part)) {
        if (i === parts.length - 1) {
          current.children.set(part, new Directory(part));
          return;
        } else {
          logger.logError('CREATE_ERROR', path, 'No such directory');
          return;
        }
      }
      current = current.children.get(part);
    }

    logger.logError('CREATE_ERROR', path, 'Directory already exists');
  }

  /**
   * Lists the contents of a directory at the specified path.
   * This method handles the following scenarios:
   * 1. Listing the contents of an existing directory
   * 2. Returning an error if the specified path doesn't exist
   * 3. Displaying the entire directory tree from the specified path
   *
   * @param {string} [path=''] - The path of the directory to list (defaults to root)
   * @returns {string} A string representation of the directory contents
   */
  list(path = '') {
    const targetDir = DirectoryUtils.traversePath(this.root, path);

    if (!targetDir) {
      logger.logError('LIST_ERROR', path, 'No such directory');
    }

    const output = DirectoryUtils.getDirectoryTree(targetDir);
    return output.join('\n');
  }

  /**
   * Deletes a directory at the specified path.
   * This method handles the following scenarios:
   * 1. Deleting an existing directory and all its contents
   * 2. Returning an error if the specified path doesn't exist
   * 3. Preventing deletion of the root directory
   *
   * @param {string} path - The path of the directory to be deleted
   * @returns {string} A message indicating the result of the operation
   */
  delete(path) {
    const parent = DirectoryUtils.getParentDirectory(this.root, path);
    const targetName = DirectoryUtils.getLastPartOfPath(path);

    if (!parent || !DirectoryUtils.checkIfDirectoryExists(parent, targetName)) {
      logger.logError('DELETE_ERROR', path, 'No such directory');
      return;
    }

    parent.children.delete(targetName);

    return;
  }

  /**
   * Moves a directory from one location to another in the file system.
   * This method handles the following scenarios:
   * 1. Moving a directory to an existing destination (as a subdirectory)
   * 2. Moving a directory to a new location (creating the destination)
   * 3. Handling errors for non-existent source or invalid destination paths
   *
   * @param {string} sourcePath - The path of the directory to be moved
   * @param {string} destPath - The destination path where the directory should be moved to
   * @returns {string} A message indicating the result of the operation
   */
  move(sourcePath, destPath) {
    // Get the source directory and its parent
    const sourceParent = DirectoryUtils.getParentDirectory(this.root, sourcePath);
    const sourceName = DirectoryUtils.getLastPartOfPath(sourcePath);

    // Check if the source directory exists
    if (!sourceParent || !DirectoryUtils.checkIfDirectoryExists(sourceParent, sourceName)) {
      logger.logError('MOVE_ERROR', `${sourcePath} ${destPath}`, 'No such directory');
      return;
    }

    const sourceDir = sourceParent.children.get(sourceName);

    // Get the destination directory
    const destDir = DirectoryUtils.traversePath(this.root, destPath);

    if (!destDir) {
      // If destination doesn't exist, try to create it
      const destParent = DirectoryUtils.getParentDirectory(this.root, destPath);
      const destName = DirectoryUtils.getLastPartOfPath(destPath);

      if (!destParent) {
        logger.logError('MOVE_ERROR', `${destPath}`, `No such directory`);
        return;
      }

      // Move the directory to the new location
      destParent.children.set(destName, sourceDir);
      sourceParent.children.delete(sourceName);

      return;
    }

    // If destination exists, move into it as a subdirectory
    if (destDir.children.has(sourceName)) {
      logger.logError('MOVE', `${sourcePath} ${destPath}`, 'Directory already exists');
      return;
    }

    // Perform the move operation
    destDir.children.set(sourceName, sourceDir);
    sourceParent.children.delete(sourceName);

    return;
  }
}

module.exports = DirectoryService;
