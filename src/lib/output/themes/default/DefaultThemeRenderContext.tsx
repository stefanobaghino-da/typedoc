import { DefaultThemePartials } from "./DefaultThemePartials";
import { MarkedPlugin } from "../MarkedPlugin";

/**
 * Themes can choose to create a single render context shared across all pages,
 * or create a new one per page, allowing the rendering logic to have access
 * to per-page information.
 */
export class DefaultThemeRenderContext {
    markedHelpers: MarkedPlugin;
    partials: DefaultThemePartials;
    /** @deprecated TODO remove this */
    get __partials__() {
        return this.partials;
    }

    constructor(markedHelpers: MarkedPlugin) {
        this.markedHelpers = markedHelpers;
        // TODO chicken-and-egg problem:
        // DefaultThemePartials destructures this.partials within constructor
        this.partials = {} as DefaultThemePartials;
        Object.setPrototypeOf(this.partials, new DefaultThemePartials(this));
    }

    relativeURL = (url: string | undefined) => {
        return url ? this.markedHelpers.getRelativeUrl(url) : url;
    };

    markdown = (md: string | undefined) => {
        return md ? this.markedHelpers.parseMarkdown(md) : "";
    };
}
