# utils/zip_utils.py
import zipfile
import os
import shutil


def extract_zip(zip_file, target_dir):
    """
    Extracts ZIP file safely
    """
    os.makedirs(target_dir, exist_ok=True)

    with zipfile.ZipFile(zip_file, "r") as zip_ref:
        zip_ref.extractall(target_dir)

    return target_dir


def create_zip(source_dir, output_zip_path):
    """
    Creates a ZIP from a directory (for final corrected project)
    """
    if os.path.exists(output_zip_path):
        os.remove(output_zip_path)

    with zipfile.ZipFile(output_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(source_dir):
            for file in files:
                full_path = os.path.join(root, file)
                arcname = os.path.relpath(full_path, source_dir)
                zipf.write(full_path, arcname)

    return output_zip_path


def cleanup_directory(path):
    """
    Deletes directory safely
    """
    if os.path.exists(path):
        shutil.rmtree(path, ignore_errors=True)
