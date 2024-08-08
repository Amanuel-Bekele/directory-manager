const {
  traversePath,
  splitPath,
  getParentDirectory,
  getLastPartOfPath,
  getDirectoryTree,
} = require('../../src/utils/DirectoryUtils');
const Directory = require('../../src/models/Directory');

describe('DirectoryUtils', () => {
    let root;

    beforeEach(() => {
      root = new Directory('');
      root.children.set('fruits', new Directory('fruits'));
      root.children.get('fruits').children.set('apples', new Directory('apples'));
    });

  describe('DirectoryDirectoryUtils - traversePath', () => {

    it('should return correct directory for existing path', () => {
      const result = traversePath(root, '/fruits');
      expect(result).toBe(root.children.get('fruits'));
    });

    it('should return correct directory for nested existing path', () => {
      const result = traversePath(root, '/fruits/apples');
      expect(result).toBe(root.children.get('fruits').children.get('apples'));
    });

    it('should return null for non-existent path', () => {
      const result = traversePath(root, '/nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('DirectoryDirectoryUtils - splitPath', () => {
    it('should correctly split a simple path', () => {
      const result = splitPath('/fruits/apples');
      expect(result).toEqual(['fruits', 'apples']);
    });

    it('should handle root path', () => {
      const result = splitPath('/');
      expect(result).toEqual([]);
    });

    it('should handle path with consecutive slashes', () => {
      const result = splitPath('//fruits///apples//');
      expect(result).toEqual(['fruits', 'apples']);
    });
  });

  describe('DirectoryUtils - getParentDirectory', () => {
    it('should return parent directory for existing path', () => {
      const result = getParentDirectory(root, '/fruits/apples');
      expect(result).toBe(root.children.get('fruits'));
    });

    it('should return root for top-level directory', () => {
      const result = getParentDirectory(root, '/fruits');
      expect(result).toBe(root);
    });

    it('should return null for non-existent path', () => {
      const result = getParentDirectory(root, '/nonexistent/path');
      expect(result).toBeNull();
    });
  });

  describe('DirectoryUtils - getLastPartOfPath', () => {
    it('should return last part of a simple path', () => {
      const result = getLastPartOfPath('/fruits/apples');
      expect(result).toBe('apples');
    });

    it('should handle path with trailing slash', () => {
      const result = getLastPartOfPath('/fruits/apples/');
      expect(result).toBe('apples');
    });

    it('should return undefined for root path', () => {
      const result = getLastPartOfPath('/');
      expect(result).toBeUndefined();
    });
  });

  describe('DirectoryUtils - getDirectoryTree method', () => {

    beforeEach(() => {
      root.children.set('vegetables', new Directory('vegetables'));
      root.children.get('fruits').children.set('apples', new Directory('apples'));
      root.children.get('vegetables').children.set('squash', new Directory('squash'));
    });

    it('should correctly represent the fruits and vegetables structure', () => {
      const result = getDirectoryTree(root);
      console.log(`${result}`);
      expect(result).toEqual([' fruits/', '  apples/', ' vegetables/', '  squash/']);
    });
  });
});
