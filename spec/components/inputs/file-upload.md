# FileUpload

> **Headless hook:** `useFileUpload`  
> **Priority:** P2  
> **Status:** 🔴 Not started

---

## Overview

Upload files via drag-and-drop or file browser. Supports single/multiple files, file type/size validation, preview thumbnails, upload progress, and drag overlay.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `accept` | `Record<string, string[]>` | — | Accepted MIME types |
| `maxFiles` | `number` | `1` | Max file count |
| `maxSize` | `number` | — | Max file size in bytes |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `disabled` | `boolean` | `false` | Disabled |
| `onFilesChange` | `(files: File[]) => void` | — | Files selected handler |
| `onUpload` | `(file: File) => Promise<void>` | — | Custom upload handler |
| `dragActive` | `boolean` | — | Controlled drag state |

## States

- **Empty:** Dashed border area with "Drop files here or click to browse"
- **Drag over:** Highlighted border + background tint + "Drop to upload"
- **Selected:** File list with name, size, type icon, remove button
- **Uploading:** Progress bar per file
- **Complete:** Success icon + filename
- **Error:** Red highlight + error message (wrong type, too large, upload failed)

## Motion

- Drag over: border color + background transition, 200ms ease-out
- File enter: list item slide + fade, stagger 50ms per file
- Upload progress: progress bar fill, linear
- Remove: item slide out + collapse, 200ms ease-in
- Success check: draw animation (SVG stroke-dashoffset)

## Accessibility

- Drop zone: `role="button"`, `aria-label="Upload files"`
- Hidden `<input type="file">` for keyboard/browse access
- File list: `role="list"`, each item `role="listitem"`
- Remove button: `aria-label="Remove {filename}"`
- Upload progress: `role="progressbar"`, `aria-valuenow`

## Usage

```tsx
<FileUpload.Root
  accept={{ 'image/*': ['.png', '.jpg', '.webp'] }}
  maxFiles={5}
  maxSize={10 * 1024 * 1024}
  multiple
  onUpload={async (file) => await uploadToS3(file)}
>
  <FileUpload.DropZone>
    <UploadIcon />
    <p>Drop images here or click to browse</p>
    <p className="muted">PNG, JPG, or WebP up to 10MB</p>
  </FileUpload.DropZone>
  <FileUpload.FileList />
</FileUpload.Root>
```
