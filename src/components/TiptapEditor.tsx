"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Markdown } from "tiptap-markdown";
import {
    Bold, Italic, Strikethrough, Underline as UnderlineIcon,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Quote, Code,
    Heading1, Heading2, Heading3,
    Link as LinkIcon, Image as ImageIcon, Table as TableIcon,
    Undo, Redo, Minus, Eraser
} from "lucide-react";
import React, { useEffect } from "react";

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            FontFamily,
            Underline,
            Image.configure({
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing...',
            }),
            Markdown.configure({
                html: true, // Allow HTML for colors/alignment
                transformPastedText: true,
                transformCopiedText: true,
                breaks: true, // Preserve soft breaks as newlines
                tightLists: false, // Prevent tight lists
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-brand-dark prose-p:text-gray-900 prose-li:text-gray-900 prose-a:text-brand-secondary hover:prose-a:text-brand-primary prose-img:rounded-2xl prose-img:shadow-md prose-strong:text-brand-dark focus:outline-none min-h-[500px] p-8',
            },
        },
        onUpdate: ({ editor }) => {
            // Get HTML output to preserve all formatting (including empty lines)
            const html = editor.getHTML();
            onChange(html);
        },
    });

    // Sync content if value changes externally (and editor is not focused/active to avoid cursor jumps)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // Only update if significantly different to avoid loops, 
            // but for now let's trust the user won't change it externally often.
            // editor.commands.setContent(value);
        }
    }, [value, editor]);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    if (!editor) {
        return null;
    }

    const addImage = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    editor.chain().focus().setImage({ src: result }).run();
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again
        event.target.value = '';
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col h-full">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {/* Toolbar */}
            <div className="bg-gray-50/80 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10 backdrop-blur-sm">

                {/* History */}
                <div className="flex items-center border-r border-gray-300 pr-2 mr-1 gap-1">
                    <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={<Undo size={16} />} tooltip="Undo" />
                    <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={<Redo size={16} />} tooltip="Redo" />
                </div>

                {/* Text Style */}
                <div className="flex items-center border-r border-gray-300 pr-2 mr-1 gap-1">
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        icon={<Bold size={16} />}
                        tooltip="Bold"
                    />
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        icon={<Italic size={16} />}
                        tooltip="Italic"
                    />
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        icon={<UnderlineIcon size={16} />}
                        tooltip="Underline"
                    />
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        icon={<Strikethrough size={16} />}
                        tooltip="Strikethrough"
                    />
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                        icon={<Eraser size={16} />}
                        tooltip="Clear Formatting"
                    />
                </div>

                {/* Colors, Font Size & Font Family */}
                <div className="flex items-center border-r border-gray-300 pr-2 mr-1 gap-1">
                    <input
                        type="color"
                        onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                        value={editor.getAttributes('textStyle').color || '#000000'}
                        className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                        title="Text Color"
                    />
                    <select
                        onChange={(e) => {
                            const size = e.target.value;
                            if (size === 'default') {
                                editor.chain().focus().unsetMark('textStyle').run();
                            } else {
                                editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
                            }
                        }}
                        className="h-8 px-2 text-xs text-gray-800 border border-gray-300 rounded bg-white cursor-pointer"
                        title="Font Size"
                        defaultValue="default"
                    >
                        <option value="default">Grootte</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="28px">28px</option>
                        <option value="32px">32px</option>
                    </select>
                    <select
                        onChange={(e) => {
                            const font = e.target.value;
                            if (font === 'default') {
                                editor.chain().focus().unsetFontFamily().run();
                            } else {
                                editor.chain().focus().setFontFamily(font).run();
                            }
                        }}
                        className="h-8 px-2 text-xs text-gray-800 border border-gray-300 rounded bg-white cursor-pointer"
                        title="Font Family"
                        defaultValue="default"
                    >
                        <option value="default">Lettertype</option>
                        <option value="Lato">Lato</option>
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                    </select>
                </div>

                {/* Alignment */}
                <div className="flex items-center border-r border-gray-300 pr-2 mr-1 gap-1">
                    <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon={<AlignLeft size={16} />} tooltip="Align Left" />
                    <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon={<AlignCenter size={16} />} tooltip="Align Center" />
                    <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon={<AlignRight size={16} />} tooltip="Align Right" />
                </div>

                {/* Headings */}
                <div className="flex items-center border-r border-gray-300 pr-2 mr-1 gap-1">
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} icon={<Heading1 size={16} />} tooltip="Heading 1" />
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={<Heading2 size={16} />} tooltip="Heading 2" />
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon={<Heading3 size={16} />} tooltip="Heading 3" />
                </div>

                {/* Lists & Quotes */}
                <div className="flex items-center border-r border-gray-300 pr-2 mr-1 gap-1">
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={<List size={16} />} tooltip="Bullet List" />
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={<ListOrdered size={16} />} tooltip="Ordered List" />
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={<Quote size={16} />} tooltip="Quote" />
                    <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={<Code size={16} />} tooltip="Code Block" />
                </div>

                {/* Insert */}
                <div className="flex items-center gap-1">
                    <ToolbarBtn onClick={setLink} isActive={editor.isActive('link')} icon={<LinkIcon size={16} />} tooltip="Link" />
                    <ToolbarBtn onClick={addImage} icon={<ImageIcon size={16} />} tooltip="Image" />
                    <ToolbarBtn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={<TableIcon size={16} />} tooltip="Table" />
                    <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<Minus size={16} />} tooltip="Horizontal Rule" />
                </div>

            </div>

            {/* Editor Content */}
            <div className="flex-grow overflow-y-auto bg-white cursor-text" onClick={() => editor.chain().focus().run()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

function ToolbarBtn({ onClick, isActive = false, disabled = false, icon, tooltip }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            className={`p-2 rounded-lg transition-all ${isActive
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200 hover:text-black'
                } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
            {icon}
        </button>
    );
}
