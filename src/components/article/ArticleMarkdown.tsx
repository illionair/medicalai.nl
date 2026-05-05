import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { ComponentPropsWithoutRef } from "react";
import InteractiveSlot from "@/components/interactives/InteractiveSlot";
import Callout from "./Callout";
import TLDR from "./TLDR";
import Term from "./Term";
import KeyTakeaway from "./KeyTakeaway";

function slugify(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function flatText(children: React.ReactNode): string {
    if (typeof children === "string") return children;
    if (typeof children === "number") return String(children);
    if (Array.isArray(children)) return children.map(flatText).join("");
    if (children && typeof children === "object" && "props" in children) {
        const node = children as { props?: { children?: React.ReactNode } };
        return flatText(node.props?.children);
    }
    return "";
}

type NodeProps = { node?: { properties?: Record<string, unknown> } };

function readAttr(node: NodeProps["node"], key: string): string | undefined {
    if (!node?.properties) return undefined;
    const v = node.properties[key];
    return typeof v === "string" ? v : undefined;
}

export default function ArticleMarkdown({ content }: { content: string }) {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            urlTransform={(value) => value}
            components={{
                h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
                    <h2 id={slugify(flatText(children))} {...props}>
                        {children}
                    </h2>
                ),
                // Custom tags lowercased by HTML parser
                interactive: ({ node }: NodeProps) => (
                    <InteractiveSlot
                        name={readAttr(node, "name")}
                        rawProps={readAttr(node, "dataProps")}
                    />
                ),
                callout: ({ node, children }: NodeProps & { children?: React.ReactNode }) => (
                    <Callout type={readAttr(node, "type")} title={readAttr(node, "title")}>
                        {children}
                    </Callout>
                ),
                tldr: ({ children }: { children?: React.ReactNode }) => <TLDR>{children}</TLDR>,
                term: ({ node, children }: NodeProps & { children?: React.ReactNode }) => (
                    <Term def={readAttr(node, "def")}>{children}</Term>
                ),
                keytakeaway: ({ children }: { children?: React.ReactNode }) => (
                    <KeyTakeaway>{children}</KeyTakeaway>
                ),
            } as never}
        >
            {content}
        </ReactMarkdown>
    );
}
