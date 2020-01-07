import React, { Component } from 'react';
import styles from './Index.less';
import { Icon, Card, message, Radio, Modal } from 'zeal-cube';
import './IconFont/iconfont.css';
// import './IconFont/demo.css';
import iconFont from './IconFont/iconfont.js'
import iconFontAttr from './IconFont/iconfont.json';

// const ZealuiIcon = Icon.createFromIconfontCN({
//   scriptUrl: iconFont, // 在 iconfont.cn 上生成
// });

class ShowAllIcon extends React.Component {
  state = {
    // selectIcon: this.props.value || '',
    selectIcon: '',

  }

  //关闭对话框
  handleCancel = () => {
    const { closeModal } = this.props;
    if (closeModal) {
      closeModal(false);
    }
  }

  //选中图片
  handleOk = () => {
    const { setValue } = this.props;
    if (setValue) {
      setValue(this.state.selectIcon);
      //关闭对话框
      this.handleCancel();
    }
  }
  //选中icon控制变量改变
  iconClick = value => {
    this.setState({
      selectIcon: value
    })
  }

  render() {
    //获取字体图标的前缀和所有图标
    const { css_prefix_text, glyphs } = iconFontAttr;
    const { selectVisible, ZealuiIcon } = this.props;
    const { selectIcon } = this.state;

    return (
      <Modal
        title='字体图标选择'
        visible={selectVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width="72%"

        bodyStyle={{
          height: '350px',
          overflow: 'auto'
        }}
      >
        <div className={styles.IconSelect}>

          <Card
            bordered={false}
          >
            {glyphs.map(icon => {
              let className = [styles.ZealuiIcon];
              if (selectIcon === icon.font_class) {
                className.push(styles.iconSelect)
              }
              return (
                <div className={className.join(' ')} onClick={() => this.iconClick(icon.font_class)}>
                  <ZealuiIcon
                    className="gec-common-font"
                    key={`${icon.font_class}`}
                    type={`${css_prefix_text}${icon.font_class}`}

                  />
                  <div className={styles.name}>{icon.name}</div>
                  <div className={styles.codeName}>{`#${icon.unicode}`}</div>
                </div>
              )
            }
            )}
          </Card>
        </div>
      </Modal>
    );
  }
}

export default ShowAllIcon