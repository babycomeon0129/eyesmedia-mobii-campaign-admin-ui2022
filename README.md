# eyesmedia-mobii-campaign-admin-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 格式說明
1. <h3>統一為功能標籤，不作他用。
2. 專案為<script setup> 寫法，建議vscode安裝Volar使用，並移除Vetur，避免跳兩次警告。
   詳：https://v3.cn.vuejs.org/api/sfc-script-setup.html


### API Block request 
const request = reactive({
  mkt_event_id: computed(() => store.state.campaign.eventID),
  block: {
    mktEventBlockId: computed(() => store.state.campaign.blockID),
    mktEventBlockName: '',
    mktEventBlockStatus: '',
    mktEventBlockSdate: '',
    mktEventBlockEdate: '',
    mktEventBlockType: computed(() => store.state.campaign.blockType),
    mktEventBlockSort: 0,
    mktEventBlockSlotNo: '',
    mktEventId: computed(() => store.state.campaign.eventID),
    tabs: [
      {
        mktEventTabId: '',
        mktEventId: '',
        mktEventTabName: '',
        mktEventTabStatus: '',
        mktEventTabSort: 0,
        mktEventTabSoltNo: '',
        mktEventTabCatalog: '',
        mktEventBlockId: '',
        itemCount: 0,
        items: [
          {
            mktEventItemId: '',
            mktEventId: '',
            mktEventItemType: '',
            mktEventItemName: '',
            mktEventItemUrlTarget: '',
            mktEventItemUrl: '',
            mktEventItemImgFullPath: '',
            mktEventItemImg: '',
            mktEventItemSort: 0,
            mktEventItemStatus: '',
            mktEventItemSdate: "2021-10-01T03:11:20.308Z",
            mktEventItemEdate: "2021-10-01T03:11:20.308Z",
            crtDate: "2021-10-01T03:11:20.308Z",
            mktEventItemSoltNo: '',
            mktEventBlockId: '',
            mktEventTabId: ''
          }
        ],
        categorys: [
          {
            mktEventCategoryId: "string",
            mktEventProdId: "string",
            mktEventVoucherId: "string",
            mktEventBlockId: "string",
            mktEventStoreId: "string",
            mktEventTabId: "string",
            mktEventCategoryType: "string'
          }
        ]
      }
    ],
    items: [
      {
        mktEventItemId: '',
        mktEventId: '',
        mktEventItemType: '',
        mktEventItemName: '',
        mktEventItemUrlTarget: '',
        mktEventItemUrl: '',
        mktEventItemImg: '',
        mktEventItemImgFullPath: '',
        mktEventItemSort: 0,
        mktEventItemStatus: '',
        mktEventItemSdate: "2021-10-01T03:11:20.308Z",
        mktEventItemEdate: "2021-10-01T03:11:20.308Z",
        crtDate: '',
        mktEventItemSoltNo: '',
        mktEventBlockId: '',
        mktEventTabId: ''
      }
    ],
    filters: [
      {
        mktEventFilterId: '',
        mktEventFilterName: '',
        mktEventFilterType: '',
        mktEventId: '',
        mktEventBlockId: '',
        filterSpecs: [
          {
            mktEventFilterSpecId: '',
            mktEventFilterSpecValue: '',
            mktEventFilterId: ''
          }
        ]
      }
    ]
  },
  paginationInfo: {
    pageIndex: 0,
    pageSize: 0,
    totalPages: 0,
    totalNumber: 0
  }
});


### 待辦事項
1. 麵包屑元件化（頁籤名稱隨著route變化，待研究）
2. 上傳圖片限制尺寸的promise失敗，需修
3. 表單驗證
4. 刪除按鈕做刪除前確認