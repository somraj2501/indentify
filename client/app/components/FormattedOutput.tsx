"use client";

interface FormattedOutputProps {
    value?: string;
}

export default function FormattedOutput({ value = "" }: FormattedOutputProps) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center justify-between mb-2">
                <label className="font-source-code-pro text-sm text-neutral-400">
                    Formatted
                </label>
                <span className="font-source-code-pro text-xs text-neutral-500">
                    {value.length} characters
                </span>
            </div>
            <div
                className="w-full h-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   overflow-auto whitespace-pre-wrap
                   transition-all duration-200"
            >
                {value || (
                    <span className="text-neutral-600">
                        Formatted code will appear here...
                    </span>
                )}
            </div>
        </div>
    );
}
