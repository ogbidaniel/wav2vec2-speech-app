import os
import argparse

def get_structure(start_path, indent='', ignore_dirs=None, ignore_files=None):
    if ignore_dirs is None:
        ignore_dirs = ['.git', '__pycache__', 'node_modules']
    if ignore_files is None:
        ignore_files = ['.gitignore', '.DS_Store']
    
    structure = []
    
    for root, dirs, files in os.walk(start_path):
        level = root.replace(start_path, '').count(os.sep)
        indent = '|   ' * (level - 1) + '+-- '
        
        dir_name = os.path.basename(root)
        if dir_name in ignore_dirs:
            continue
        
        if level > 0:
            structure.append(f"{indent[:-4]}+-- {dir_name}/")
        
        subindent = '|   ' * level + '+-- '
        for file in sorted(files):
            if file not in ignore_files:
                structure.append(f"{subindent}{file}")
    
    return '\n'.join(structure)

def main():
    parser = argparse.ArgumentParser(description="Display the structure of a codebase.")
    parser.add_argument('--path', default='.', help='Path to the codebase (default: current directory)')
    args = parser.parse_args()
    
    print(f"Structure of codebase at {os.path.abspath(args.path)}:")
    print(get_structure(args.path))

if __name__ == "__main__":
    main()