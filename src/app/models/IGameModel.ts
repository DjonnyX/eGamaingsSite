export interface IGameModel {

    /**
     * идентификатор игры
     */
    id: string;

    /**
     * имя игры
     */
    name: string;

    /**
     * описание игры
     */
    description: string;

    /**
     * base64img
     */
    image: string;

    /**
     * Тэг игры
     */
    tag: string;

    /**
     * Лайкнутый пользователем
     */
    _isFavorite?: boolean;
}
