import * as Markdown from 'markdown-it';

export default class MarkdownService {
  public static render(mdsrouce: string): string {
    return this.markdown.render(mdsrouce);
  }
  private static markdown = Markdown();
}