"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bold, Italic, List, Heading1, Heading2, Link as LinkIcon, Quote, Code, Eye, Edit3, Columns, Image as ImageIcon, Minus, Table as TableIcon } from "lucide-react";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    const [mode, setMode] = useState<"write" | "preview" | "split">("split");

    const insertText = (before: string, after: string = "") => {
        const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    return (
        <div className="flex flex-col h-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex-wrap gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                    <ToolbarButton icon={<Heading1 size={18} />} onClick={() => insertText("# ")} tooltip="Heading 1" />
                    <ToolbarButton icon={<Heading2 size={18} />} onClick={() => insertText("## ")} tooltip="Heading 2" />
                    <div className="w-px h-6 bg-gray-200 mx-2 hidden md:block" />
                    <ToolbarButton icon={<Bold size={18} />} onClick={() => insertText("**", "**")} tooltip="Bold" />
                    <ToolbarButton icon={<Italic size={18} />} onClick={() => insertText("*", "*")} tooltip="Italic" />
                    <div className="w-px h-6 bg-gray-200 mx-2 hidden md:block" />
                    <ToolbarButton icon={<List size={18} />} onClick={() => insertText("- ")} tooltip="List" />
                    <ToolbarButton icon={<Quote size={18} />} onClick={() => insertText("> ")} tooltip="Quote" />
                    <ToolbarButton icon={<Code size={18} />} onClick={() => insertText("`", "`")} tooltip="Code" />
                    <div className="w-px h-6 bg-gray-200 mx-2 hidden md:block" />
                    <ToolbarButton icon={<LinkIcon size={18} />} onClick={() => insertText("[", "](url)")} tooltip="Link" />
                    <ToolbarButton icon={<ImageIcon size={18} />} onClick={() => insertText("![alt text](", ")")} tooltip="Image" />
                    <ToolbarButton icon={<TableIcon size={18} />} onClick={() => insertText("| Header | Header |\n| --- | --- |\n| Cell | Cell |")} tooltip="Table" />
                    <ToolbarButton icon={<Minus size={18} />} onClick={() => insertText("\n---\n")} tooltip="Horizontal Rule" />
                </div>

                <div className="flex items-center bg-gray-200/50 rounded-lg p-1">
                    <button
                        onClick={() => setMode("write")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "write" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                            }`}
                        title="Write Only"
                    >
                        <Edit3 size={14} /> <span className="hidden sm:inline">Write</span>
                    </button>
                    <button
                        onClick={() => setMode("split")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "split" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                            }`}
                        title="Split View"
                    >
                        <Columns size={14} /> <span className="hidden sm:inline">Split</span>
                    </button>
                    <button
                        onClick={() => setMode("preview")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "preview" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                            }`}
                        title="Preview Only"
                    >
                        <Eye size={14} /> <span className="hidden sm:inline">Preview</span>
                    </button>
                </div>
            </div>

            {/* Editor / Preview Area */}
            <div className="flex-grow overflow-hidden relative flex">
                {/* Write Pane */}
                {(mode === "write" || mode === "split") && (
                    <div className={`h-full ${mode === "split" ? "w-1/2 border-r border-gray-200" : "w-full"}`}>
                        <textarea
                            id="markdown-textarea"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full h-full p-6 resize-none focus:outline-none font-mono text-base leading-relaxed text-gray-800 bg-white"
                            placeholder="Start writing your masterpiece..."
                        />
                    </div>
                )}

                {/* Preview Pane */}
                {(mode === "preview" || mode === "split") && (
                    <div className={`h-full overflow-y-auto bg-gray-50/30 ${mode === "split" ? "w-1/2" : "w-full"}`}>
                        <div className="p-8 prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600">
                            <ReactMarkdown>{value || "*Nothing to preview yet.*"}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ToolbarButton({ icon, onClick, tooltip }: { icon: React.ReactNode, onClick: () => void, tooltip: string }) {
    return (
        <button
            onClick={onClick}
            title={tooltip}
            className="p-2 text-gray-500 hover:text-black hover:bg-gray-200/50 rounded-lg transition-colors"
        >
            {icon}
        </button>
    );
}
