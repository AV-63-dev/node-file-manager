# node-file-manager
Task: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md

ИНСТРУКЦИЯ:  
> Старт: npm run start -- --username=your_username (в обратном случае выведет подсказку)  

КОМАНДЫ И ИХ АРГУМЕНТЫ:  
> up  
> cd <path_to_directory>  
> ls  
> cat <path_to_file>  
> add <new_file_name>  
> rn <path_to_file> <new_file_name>  
> cp <path_to_file> <path_to_new_directory>  
> mv <path_to_file> <path_to_new_directory>  
> rm <path_to_file>  
> os --EOL  
> os --cpus  
> os --homedir  
> os --username  
> os --architecture  
> hash <path_to_file>  
> compress <path_to_file> <path_to_new_directory>  
> decompress <path_to_file> <path_to_new_directory>  

> <path_to_directory> - путь до директории, если с пробельными символами - используй кавычки  
> <path_to_file> - путь до файла  
> <new_file_name> - имя файла  
> <path_to_new_directory> - путь до директории, если директории нет то будет создана новая (глубина вложенности - любая)  

Реализована работа с учетом прав доступа в системе😁  

MY TOTAL SCORE: +330  
> +6 Application accepts username and prints proper message  
> +10 Application exits if user pressed ctrl+c or sent .exit command and proper message is printed  
> +20 Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail  
> +10 Operation fail doesn't crash application  
> +10 Go upper from current directory  
> +10 Go to dedicated folder from current directory  
> +20 List all files and folders in current directory  
> +10 Read file and print it's content in console  
> +10 Create empty file  
> +10 Rename file  
> +10 Copy file  
> +10 Move file  
> +10 Delete file  
> +6 Get EOL (default system End-Of-Line)  
> +10 Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)  
> +6 Get home directory  
> +6 Get current system user name (Do not confuse with the username that is set when the application starts)  
> +6 Get CPU architecture for which Node.js binary has compiled  
> +20 Calculate hash for file  
> +20 Compress file (using Brotli algorithm)  
> +20 Decompress file (using Brotli algorithm)  
> +30 All operations marked as to be implemented using certain streams should be performed using Streams API  
> +20 No synchronous Node.js API with asynchronous analogues is used (e.g. not used readFileSync instead of readFile)  
> +20 Codebase is written in ESM modules instead of CommonJS  
> +20 Codebase is separated (at least 7 modules)  
