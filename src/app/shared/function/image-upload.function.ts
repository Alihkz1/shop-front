export function ValidImageUploaded(file: File): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isImageType = file.type.startsWith('image/');
    return isImageType && allowedExtensions.includes(fileExtension || '');
}