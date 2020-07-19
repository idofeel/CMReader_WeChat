import {_get} from '../utils/request'
import api from '../pages/API/index'

export const data = {
    menusData: [],  // 菜单数据
    currentMenuIndex: 0, // 当前主菜单下标
    currentTabs:[], // 当前tab数据
    currentTabIndex: 0, // 当前tab切换的下标
}

export const mapMenusMutations = {
    updateMenus(newData = {}) {
        Object.keys(newData).map(item=>{
            data[item] = newData[item]
        })
        if(newData.currentMenuIndex !== undefined){
            data.currentTabs = data.menusData[newData.currentMenuIndex].sub
        }
    },
    async getMenusData(callback){
        try {
            const res = await _get(api.main.menu);
            if(res.success){
                this.updateMenus({
                    menusData: res.data,
                    currentTabs: res.data[data.currentMenuIndex].sub
                })
            }else{
                wx.showToast({
                    title: res.message || '获取菜单失败',
                })
            }
        } catch (error) {
            callback(error)
        }finally{
            // callback(data)
        }
    }
}