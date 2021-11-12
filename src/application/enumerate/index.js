// 弹窗类型
const ModalType = {
  init: 0,
  create: 1,
  update: 2,
  view:3,
  description(rawValue) {
    switch (rawValue) {
      case this.create: return '添加';
      case this.update: return '编辑';
      case this.view: return '查看';
      default: return '';
    }
  },
};

export {
  ModalType
}