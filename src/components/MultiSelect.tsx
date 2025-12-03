"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Check } from "lucide-react";

interface Option {
    id: string;
    name: string;
}

interface MultiSelectProps {
    options: Option[];
    selected: string[]; // Array of IDs
    onChange: (selected: string[]) => void;
    onCreate?: (name: string) => Promise<Option | null>;
    placeholder?: string;
}

export default function MultiSelect({ options, selected, onChange, onCreate, placeholder = "Select..." }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOptions = options.filter(opt => selected.includes(opt.id));
    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase()) &&
        !selected.includes(opt.id)
    );

    const handleSelect = (id: string) => {
        onChange([...selected, id]);
        setSearch("");
    };

    const handleRemove = (id: string) => {
        onChange(selected.filter(s => s !== id));
    };

    const handleCreate = async () => {
        if (!onCreate || !search) return;
        const newOption = await onCreate(search);
        if (newOption) {
            onChange([...selected, newOption.id]);
            setSearch("");
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div
                className="min-h-[42px] p-1 border border-gray-200 rounded-lg bg-white flex flex-wrap gap-1 cursor-text focus-within:ring-2 focus-within:ring-black/5 focus-within:border-black"
                onClick={() => setIsOpen(true)}
            >
                {selectedOptions.map(opt => (
                    <span key={opt.id} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-sm rounded-md text-black">
                        {opt.name}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleRemove(opt.id); }}
                            className="hover:text-red-500"
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    className="flex-1 min-w-[120px] border-none focus:ring-0 p-1 text-sm text-black placeholder-gray-400"
                    placeholder={selected.length === 0 ? placeholder : ""}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && search) {
                            e.preventDefault();
                            if (filteredOptions.length > 0) {
                                handleSelect(filteredOptions[0].id);
                            } else if (onCreate) {
                                handleCreate();
                            }
                        }
                        if (e.key === "Backspace" && !search && selected.length > 0) {
                            handleRemove(selected[selected.length - 1]);
                        }
                    }}
                />
            </div>

            {isOpen && (search || filteredOptions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredOptions.map(opt => (
                        <button
                            key={opt.id}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between text-black"
                            onClick={() => handleSelect(opt.id)}
                        >
                            {opt.name}
                        </button>
                    ))}
                    {search && filteredOptions.length === 0 && onCreate && (
                        <button
                            className="w-full text-left px-3 py-2 text-sm text-brand-primary hover:bg-brand-primary/5 flex items-center gap-2 font-medium"
                            onClick={handleCreate}
                        >
                            <Plus size={14} />
                            Create "{search}"
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
