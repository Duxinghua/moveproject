<template>
    <div class="edit-address">
        <div class="address-box">
            <van-field
                v-model="name"
                clearable
                label="收货人："
                placeholder="请输入收货人"
            />
            <van-field
                v-model="mobile"
                clearable
                type="tel"
                label="手机号码："
                placeholder="请输入手机号码"
            />
            <van-field
                readonly
                clickable
                label="所在地区："
                placeholder="请选择"
                right-icon="arrow"
                :value="areaText"
                @click="onShowArea"
            />
            <van-field
                class="textarea"
                v-model="address"
                rows="3"
                autosize
                label="详细地址："
                type="textarea"
                placeholder="请填写"
            />
            <!-- <van-switch-cell v-model="isDefault" active-color="#768169" title="是否默认地址" /> -->
        </div>

        <button class="submit" :disabled="isDisable" @click="saveAddress">
            {{addressId ? '编辑收货地址' : '新增收货地址'}}
        </button>

        <van-popup
          v-model="showAreaPopup"
          round
          position="bottom"
        >
          <van-area
            :area-list="areaList"
            :value="addressValue"
            @confirm="onAreaConfirm"
            @cancel="onCancelArea"
          />
        </van-popup>
    </div>
</template>

<script>
import AreaList from '@/utils/area';
import { Notify } from 'vant';

export default {
    data() {
        return {
            isDisable:false,
            showAreaPopup:false,
            name:'',
            mobile:'',
            areaText:'',
            areaList:AreaList,
            areaListData:[],
            address:'',
            addressId:0,
            addressValue:'',
            isDefault:false
        }
    },
    mounted(){
        const {id} = this.$route.query;
        if(id){
            this.addressId = id;
            this.getAddress(id)
        }else{
            this.addressId = 0;
        }
    },
    methods:{
        getAddress(id){
            this.$api.address({id}).then((res) => {
                if(res.code == 1){
                    const data = res.data;
                    this.name = data.user_name;
                    this.mobile = data.mobile;
                    this.areaText = data.address_name;
                    this.address = data.address;
                    const addressName = data.address_name.split('/');
                    this.areaListData.push({code:data.province,name:addressName[0]})
                    this.areaListData.push({code:data.city,name:addressName[1]})
                    this.areaListData.push({code:data.area,name:addressName[2]})
                    this.addressValue = data.area;
                    this.isDefault = data.is_default == 1 ? true : false
                }
            })
        },
        saveAddress(){
            if(!this.name){
                Notify({ type: 'danger', message: '请输入收货人' });
                return false
            }
            if(!this.mobile){
                Notify({ type: 'danger', message: '请输入手机号码' });
                return false
            }
            if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
                Notify({ type: 'danger', message: '请输入正确手机格式' });
                return false
            }
            if(this.areaListData.length != 3){
                Notify({ type: 'danger', message: '请选择所在地区' });
                return false
            }
            if(!this.address){
                Notify({ type: 'danger', message: '请输入详细地址' });
                return false
            }
            const param = {
                id:this.addressId,
                user_name:this.name,
                mobile:this.mobile,
                province:this.areaListData[0].code,
                city:this.areaListData[1].code,
                area:this.areaListData[2].code,
                address_name:this.areaText,
                address:this.address,
                is_default:this.isDisable ? 1 : 0
            }
            const _this = this;
            this.isDisable = true
            this.$api.saveAddress(param).then((res) => {
                this.isDisable = false
                if(res.code == 1){
                    this.$toast({
                        type:'success',
                        message:res.msg,
                        onClose(){
                            _this.$router.back(-1)
                        }
                    });
                }else{
                    Notify({ type: 'danger', message: res.msg });
                }
            })
        },
        onShowArea(){
            this.showAreaPopup = true;
        },
        onCancelArea(){
            this.showAreaPopup = false;
        },
        onAreaConfirm(values){
            values = values.filter(value => !!value);
            if (values.some(value => !value.code)) {
                Toast('请选择地区');
                return;
            }
            let areaText = []
            values.forEach((item) => {
                areaText.push(item.name)
            })
            this.areaListData = values;
            this.areaText = areaText.join('/');
            this.showAreaPopup = false;
        }
    }
}
</script>

<style lang='scss' scoped>
.edit-address{
    width: 100%;
    min-height: 100vh;
    background: #FBF8F5;
    .address-box{
        background: #fff;
        padding: 20px 25px;
        /deep/ .van-cell{
            padding: 30px 0px;
            align-items: center;
            &:not(:last-child)::after{
                border-width: 1Px;
            }
            &.textarea{
                align-items: flex-start;
                .van-cell__title{
                    span{
                        line-height: 1;
                    }
                }
            }
            .van-cell__title{
                width: 150px;
                font-size: 26px;
                color: #666666;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            // &:last-child{
            //     .van-cell__title{
            //         justify-content:flex-start;
            //     }
            // }
            input,textarea{
                color: #333333;
                font-size: 30px;
                line-height: 1;
            }
            .van-field__body{
                i{
                    font-size: 30px;
                }
            }
            .van-field__right-icon{
                color: #000000;
                i{
                    font-size: 30px;
                }
            }
            &:last-child{
                .van-field__label{
                    align-items: flex-start;
                }
            }
        }
        
    }

    .submit{
        display: block;
        width: 680px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        background: #738266;
        color: #F3D995;
        font-size: 36px;
        margin: 0 auto;
        margin-top: 100px;
        border-radius: 50px;
        outline: none;
        border: none;
    }
    /deep/ .van-popup{
        .van-picker__toolbar{
            padding: 25px 0px;
            height: auto;
            line-height: 1;
            button{
                font-size: 28px;
                color: #666666;
                &:last-child{
                    color: #6D8160;
                }
            }
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
            border-width: 1Px;
        }
    }
}
</style>