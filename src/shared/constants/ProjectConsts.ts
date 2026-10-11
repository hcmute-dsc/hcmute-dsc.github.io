import { translate } from '@docusaurus/Translate';
import { Tag } from '@site/src/shared/dto/Tag';

export type ProjectTagType =
    | 'favorite'
    // Projects built by HCMUTE DSC members for the club
    | 'club'
    | 'ai'
    // The source code is public
    | 'opensource'
    | 'product';

export const ProjectTags: { [type in ProjectTagType]: Tag } = {
    favorite: {
        label: translate({ message: 'Favorite' }),
        description: translate({
            message:
                'Những dự án nổi bật nhất của CLB',
            id: 'showcase.tag.favorite.description',
        }),
        color: '#e9669e',
    },

    club: {
        label: translate({ message: 'Club' }),
        description: translate({
            message: 'Dự án do thành viên HCMUTE DSC xây dựng cho CLB',
            id: 'showcase.tag.club.description',
        }),
        color: '#f0622d',
    },

    ai: {
        label: translate({ message: 'AI' }),
        description: translate({
            message: 'Dự án có ứng dụng AI',
            id: 'showcase.tag.ai.description',
        }),
        color: '#4f6bd8',
    },

    opensource: {
        label: translate({ message: 'Open-Source' }),
        description: translate({
            message: 'Dự án mã nguồn mở, có thể xem source để học hỏi',
            id: 'showcase.tag.opensource.description',
        }),
        color: '#39ca30',
    },

    product: {
        label: translate({ message: 'Product' }),
        description: translate({
            message: 'Sản phẩm đã được triển khai và sử dụng thực tế',
            id: 'showcase.tag.product.description',
        }),
        color: '#dfd545',
    },
};

export const ProjectTagList = Object.keys(ProjectTags) as ProjectTagType[];
