import os
import argparse
import fnmatch

def parse_gitignore(gitignore_path):
    if not os.path.exists(gitignore_path):
        return []
    with open(gitignore_path, 'r') as f:
        return [line.strip() for line in f if line.strip() and not line.startswith('#')]

def should_ignore(path, ignore_patterns):
    return any(fnmatch.fnmatch(os.path.basename(path), pattern) for pattern in ignore_patterns)

def get_structure(start_path, indent='', ignore_patterns=None):
    if ignore_patterns is None:
        ignore_patterns = []
    
    gitignore_path = os.path.join(start_path, '.gitignore')
    ignore_patterns.extend(parse_gitignore(gitignore_path))
    
    structure = []
    
    for root, dirs, files in os.walk(start_path):
        level = root.replace(start_path, '').count(os.sep)
        indent = '|   ' * (level - 1) + '+-- '
        
        dirs[:] = [d for d in dirs if not should_ignore(d, ignore_patterns) and d != '.git']
        
        dir_name = os.path.basename(root)
        if level > 0 and not should_ignore(dir_name, ignore_patterns):
            structure.append(f"{indent[:-4]}+-- {dir_name}/")
        
        subindent = '|   ' * level + '+-- '
        for file in sorted(files):
            if not should_ignore(file, ignore_patterns):
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