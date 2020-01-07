import React, { Component } from 'react';
import styles from './Index.less';
import { Icon, Tag, Input, Button } from 'zeal-cube';

import iconFont from './IconFont/iconfont.js'

const ZealuiIcon = Icon.createFromIconfontCN({
  scriptUrl: iconFont, // 在 iconfont.cn 上生成
});

import ShowAllIcon from './ShowAllIcon';

class Index extends React.Component {
  state = {
    // value: this.props.value || [{ key: 'unicom-fill' }],
    value: this.props.value || [],

    selectVisible: false,
    //正在输入tag中的值
    inputValue: '',
    multiple: this.props.multiple || false,
  }

  //点击图标，显示更换Icon组件
  iconClick = () => {
    this.controlModal(true)
  }

  //选中后更改组件value,并且同步到父组件form中
  setValue = (value) => {
    const { multiple } = this.state;
    //如果为多选，数组长度可变更
    if (multiple) {
      const allValue = [...this.state.value];
      allValue.push({ key: value })
      // }
      this.setState({
        value: allValue
      }, () => {
        this.props.onChange(allValue);
      })
    } else {
      //为单选，数组长度只为1
      this.setState({
        value: [{ key: value }]
      }, () => {
        this.props.onChange([{ key: value }]);
      })
    }
  }

  //控制选择icon的对话框显隐
  controlModal = (flag) => {
    this.setState({
      selectVisible: !!flag
    })
  }

  //tag标签保存
  handleInputConfirm = (key, index) => {

    let allValue = [...this.state.value];
    const { inputValue } = this.state;

    if (inputValue && allValue[index] && allValue[index].key === key) {
      allValue[index].tag = inputValue
    }

    this.setState({
      value: allValue
    })
  }
  //标签输入框事实变更值
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  //关闭已经保存的tag
  tagClose = (key, index) => {
    let allValue = [...this.state.value];
    //清空选中标签
    if (allValue[index] && allValue[index].key === key) {
      allValue[index].tag = ''
    }
    this.setState({
      value: allValue
    })
    return;
  }

  render() {
    const { value, selectVisible, multiple } = this.state;
    return (
      <div>
        {
          value.map((item, index) => {
            console.log('item', item);
            const { key, tag } = item;
            return (
              <div className={styles.iconGroup}>
                <ZealuiIcon
                  className="gec-Alone-font"
                  key={key}
                  value={key}
                  type={`zealui-icon-${key}`}
                >
                </ZealuiIcon>
                <div className={styles.iconGroupTag}>
                  {
                    !multiple ? null :
                      tag ?
                        <Tag
                          color="volcano"
                          closable
                          onClose={() => this.tagClose(key, index)}
                        >
                          {tag}
                        </Tag> :
                        <Input
                          style={{ width: '100px' }}
                          onChange={this.handleInputChange}
                          onPressEnter={() => this.handleInputConfirm(key, index)}
                          onBlur={() => this.handleInputConfirm(key, index)}
                        />
                  }

                </div>
              </div>
            )
          })
        }
        <Button type="primary" onClick={this.iconClick}>选择</Button>
        {
          selectVisible ?
            <ShowAllIcon
              selectVisible={selectVisible}
              closeModal={this.controlModal}
              ZealuiIcon={ZealuiIcon}
              setValue={this.setValue}
              value={this.state.value}
            /> : null
        }
      </div>
    );
  }
}

export default Index