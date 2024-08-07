class DirectoryUtils {
  /**
   * Traverses the directory structure from the root to the given path.
   
   * @param {Directory} root - The root directory of the file system.
   * @param {string} path - The path to traverse.
   
   * @returns {Directory|null} The final directory if found, null otherwise.
   */
  static traversePath(root, path) {
    const parts = this.splitPath(path);

    let current = root;
    for (const part of parts) {
      if (!current.children?.has(part)) {
        return null;
      }
      current = current.children.get(part);
    }

    return current;
  }

  /**
   * Splits a path into an array of directory names.
   *
   * @param {string} path - The path to split.
   * @returns {string[]} An array of directory names.
   */
  static splitPath(path) {
    return path.split('/').filter(Boolean);
  }

  /**
   * Checks if a directory exists within a given parent directory.
   *
   * @param {Directory} current - The parent directory to check.
   * @param {string} part - The name of the directory to check for.
   *
   * @returns {boolean} True if the directory exists, false otherwise.
   */
  static checkIfDirectoryExists(current, part) {
    return current.children.has(part);
  }

  /**
   * Finds the parent directory of a given path.
   *
   * @param {Directory} root - The root directory of the file system.
   * @param {string} path - The path to find the parent of.
   *
   * @returns {Directory|null} The parent directory if found, null otherwise.
   */
  static getParentDirectory(root, path) {
    const parts = this.splitPath(path);
    let current = root;
    let i = 0;

    while (i < parts.length - 1) {
      if (!current.children?.has(parts[i])) {
        return null;
      }
      current = current.children.get(parts[i]);
      i++;
    }

    return current;
  }

  /**
   * Extracts the last part of a path (the target directory name).
   *
   * @param {string} path - The path to extract from.
   * @returns {string} The last part of the path.
   */
  static getLastPartOfPath(path) {
    const parts = this.splitPath(path);
    return parts[parts.length - 1];
  }

  /**
   * Generates an array of strings representing the directory structure.
   *
   * @param {Directory} directory - The directory to print.
   * @param {number} [depth=0] - The current depth in the directory tree.
   * @returns {string[]} An array of strings representing the directory structure.
   */
  static getDirectoryTree(directory, depth = 0) {
    const output = [];
    const indent = '    '.repeat(depth);
    if (directory.name !== '') {
      output.push(`${indent}${directory.name}/`);
    }
    for (const child of directory.children.values()) {
      output.push(...this.getDirectoryTree(child, depth + 1));
    }
    return output;
  }

  /**
   * Checks if a directory name is valid.
   *
   * @param {name} name The name of the directory to validate
   * @returns {boolean} True if the directory name is valid, false otherwise
   */
  static isValidDirectoryName(name) {
    if (name.length === 0) {
      return false;
    }

    // '/' is forbidden in linux dir names.
    if (name.includes('/')) {
      return false;
    }

    // Max of 255 characters for directory name.
    if (name.length > 255) {
      return false;
    }

    return true;
  }
}

module.exports = DirectoryUtils;
