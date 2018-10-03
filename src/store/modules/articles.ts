import { IArticle } from "../../models/article";

interface IStateShape {
  articles: IArticle[];
}
const initialState: IStateShape = {
  articles: new Array<IArticle>(),
};

export default (state = initialState, action: any): IStateShape => {
  switch (action.type) {
    case 'getArticles': {
      return {
        ...state,
        articles: [
          {
            author: {
              avatarURL: '/assets/img/Holo.full.191598.jpg',
              name: 'frodoluo'
            },
            comments: 0,
            contentUrl: 'http://www.frodoluo.ink/article/0',
            id: 0,
            title: 'This Is The Title Of An Article',
            updateDate: new Date()
          }, {
            author: {
              avatarURL: '/assets/img/Holo.full.191598.jpg',
              name: 'frodoluo'
            },
            comments: 0,
            contentUrl: 'http://www.frodoluo.ink/article/0',
            id: 0,
            title: 'This Is The Title Of An Article',
            updateDate: new Date()
          }
        ]
      };
    }
    default:
      return state;
  }
};