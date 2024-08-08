# Directory Manager

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A simple Node.js application that accepts CREATE, MOVE, LIST, and DELETE commands to perform file system operations in a virtual directory structure.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Error Handling](#error_Handling)
- [Author](#author)
- [Acknowledgement](#acknowledgments)

## Features

- Create virtual directories
- Move directories within the virtual file system
- List the current directory structure
- Delete directories
- Simulates a UNIX-like file system without actually creating files on the host machine

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed (version 14 or higher is recommended).

2. Clone the repository: `git clone https://github.com/Amanuel-Bekele/directory-manager.git`
3. Navigate to the project directory: `cd directory-manager`
4. Install dependencies: `npm install`

## Usage

To start the Directory Manager, run:

``npm run start``

This will launch an interactive command-line interface where you can enter commands to manipulate the virtual directory structure.

> **_NOTE:_**  The directory system comes with a root directory `/`.

## Commands

- `CREATE <path>`: Create a new directory at the specified path.
- `LIST [path]`: List the contents of the specified directory (or root if not specified).
- `MOVE <source_path> <destination_path>`: Move a directory from the source path to the destination path.
- `DELETE <path>`: Delete the directory at the specified path.

> :warning: Commands must be given one after another!
>
Example usage:

```
CREATE Fruits
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
````

Prints the following hierarchy:

````
fruits/
    apples/
        fuji/
vegetables/
grains/
````

Continuing with more commands:

```
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
```


Prints the following hierarchy:

```  
foods/
    grains/
    fruits/
        apples/
            fuji/
    vegetables/
        squash/
```

## Error_Handling
* Trying to delete a directory that does not exist throws an error. For instance, from the above example, trying to delete `fruits/apples` will fail because there's no such directory `fruits/apples`.


        DELETE fruits/apples
        DELETE_ERROR: fruits/apples: No such directory

* Trying to CREATE a directory that already exists throws an error.


    CREATE foods
    CREATE_ERROR: foods: Directory already exists

* Trying to create a directory in a directory that does not exist throws and error.


    CREATE foods/greens/kale/
    CREATE_ERROR: foods/greens/kale/: No such directory

* Trying to move a directory whose source or destination does not exist throws an error.


    MOVE foods/vegetables foods/greens/vegetables
    MOVE_ERROR: foods/vegetables foods/greens/vegetables: No such directory

* Trying to list a directory that does not exist throw an error.


    LIST Fiji
    LIST_ERROR, Fiji, No such directory

## Author

Amanuel Bekele

## Acknowledgments

- This project was created as part of a coding challenge to demonstrate file system operations in a virtual environment.