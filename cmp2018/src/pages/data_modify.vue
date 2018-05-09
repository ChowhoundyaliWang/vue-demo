<template>
    <div class="data_modify">
        <div class="cell_wrap">
            <div class="cell bb">
                <div class="field">客户姓名</div>
                <div class="text_value"><input class="input_text" type="text" v-model="getData.user_name" readonly="readonly"></div>
            </div>
            <div class="cell bb" @click="toPhone" style="border-bottom: 2px solid #eee;">
                <div class="field">移动电话</div>
                <div class="text_value">{{getMobile}}</div>
                <i class="right_arrow"></i>
            </div>
            <div class="cell bb">
                <div class="field">固定电话</div>
                <div class="text_value"><input class="input_text" type="text" v-model="getData.home_tel"></div>
            </div>
            <div class="cell bb">
                <div class="field">电子邮箱</div>
                <div class="text_value"><input class="input_text" type="text" v-model="getData.e_mail"></div>
            </div>
            <div class="cell bb">
                <div class="field">联系地址</div>
                <div class="text_value"><input class="input_text" type="text" v-model="getData.address"></div>
            </div>
            <div class="cell">
                <div class="field">追保邮箱</div>
                <div class="text_value"><input class="input_text" type="text" v-model="getData.zb_e_mail" readonly="readonly"></div>
            </div>
        </div>
        <div class="cell_wrap">
            <div class="cell bb">
                <div class="field field_long">紧急联系人姓名</div>
                <div class="text_value textlong_value"><input class="input_text" type="text" v-model="getData.sec_relation_name"></div>
            </div>
            <div class="cell">
                <div class="field field_long">紧急联系人移动电话</div>
                <div class="text_value textlong_value"><input class="input_text" type="text" v-model='getData.sec_relation_phone'></div>
            </div>
        </div>

        <div class="cell_wrap">
            <div class="cell bb">
                <div class="field">职业</div>
                <select class="field_select" id="cardSelect" name="idCardType" v-model="getData.profession_code">
                    <option :value="jobItem.dict_option" v-for="(jobItem,index) in getJobData">{{jobItem.dict_desc}}</option>
                </select>
            </div>
            <div class="cell bb">
                <div class="field">民族</div>
                <select class="field_select" v-model="getData.nation_id">
                    <option :value="ethic.val" v-for = "ethic in ethnics">{{ethic.name}}</option>
                </select>
            </div>
            <div class="cell bb">
                <div class="field">工作单位</div>
                <div class="text_value"><input class="input_text" type="text" maxlength="30" v-model="getData.company_name"></div>
            </div>
            <div class="cell bb">
                <div class="field field_long">实际受益人</div>
                <div class="text_value textlong_value">
                    <input class="field_choose" name="benefit" checked type="radio" value="本人" v-model="isShowOther"><label>本人</label>
                    <input class="field_choose" name="benefit" type="radio" value="他人" v-model="isShowOther"><label>他人</label>
                </div>
            </div>
            <div v-if="isShowOther == '他人'">
            <div class="cell bb">
                <div class="field field_long">实际受益人姓名</div>
                <div class="text_value textlong_value"><input class="input_text" type="text" maxlength="30" v-model="getData.benefit_person"></div>
            </div>
            <div class="cell bb">
                <div class="field field_long">身份证号码</div>
                <div class="text_value textlong_value"><input class="input_text" type="text" maxlength="30" v-model="getData.benefit_idno"></div>
            </div>
            <div class="cell bb">
                <div class="field field_long">手机号码</div>
                <div class="text_value textlong_value"><input class="input_text" type="text" maxlength="30" v-model="getData.benefit_mobile"></div>
            </div>
            </div>
            <div class="cell bb">
                <div class="field field_long">实际控制人</div>
                <div class="text_value textlong_value">
                    <input class="field_choose" name="control" :checked="isChecked" type="radio" value='1'/><label>本人</label>
                    <input class="field_choose" name="control" :checked="!isChecked" type="radio" value="0" @click="controlCheck"/><label>他人</label>
                </div>
            </div>
            <div class="cell bb">
                <div class="field field_long">是否存在不良记录</div>
                <div class="text_value textlong_value">
                    <input class="field_choose" name="record" type="radio" value='是' v-model="getData.is_credit"><label>是&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input class="field_choose" name="record" type="radio" value="否" v-model="getData.is_credit"><label>否</label>
                </div>
            </div>
            <div class="record_choose" v-if="getData.is_credit == '是'" style="position: relative;">
                <div v-for="(badItem,index) in getBadRecord">
                    <input class="field_choose record_field_choose" name="record_more" type="radio" :value='badItem.dict_desc' v-model="getData.credit_record" :index="index"><label class="other_label">{{badItem.dict_option + badItem.dict_desc}}</label>
                </div>
                <div class="other_txt"><input type="text" name="" v-model="otherTxt"></div>
            </div>
        </div>

        <div class="my_bottom" @click="submit">
            <div class="c_btn">确认修改</div>
        </div>

        <msg-box 
            class="box_alert"
            v-if="dialogInfo.isShow"
            :type="dialogInfo.type"
            :title="dialogInfo.title"
            :content="dialogInfo.content"
            :cancel-text="dialogInfo.cancelText"
            @done="doneAlert"
            @cancel="closeAlert">
        </msg-box>
    </div>
</template>
<script type="text/javascript">
    import msgBox from './msg_box.vue';
    import myJson from '../assets/ethic.json';
    import $store from '../stores/index.js';
    export default {
        data () {
            return {
                otherTxt: '',
                otherSave: '',
                isChecked: true,
                isModify: false,
                isExpired: false,
                isOther: false,
                isShowOther: '他人',
                gmset: false,
                ethnics: [],
                chen: '',
                dialogInfo: {
                    isShow: false,
                    type: '',
                    title: '',
                    content: '',
                    cancelText: ''
                }
            };
        },
        created () {
        },
        components: {
            msgBox
        },
        computed: {
            getData () {
                return this.$store.state.user.list;
            },
            getJobData () {
                return this.$store.state.user.jobList;
            },
            getBadRecord () {
                return this.$store.state.user.badList;
            },
            getMobile () {
                return this.$store.state.user.mobile;
            }
        },
        beforeRouteEnter (to, from, next) {
            let isShowOther = '他人';
            let gmset = false;
            $store.dispatch('user/getInfo').then((data) => {
                if (data.benefit_person === data.user_name || !data.benefit_person.trim()) {
                    isShowOther = '本人';
                }
                return $store.dispatch('user/checkGrowthEnterpriseBoard');
            }).then((data) => {
                if (data && data.status === '1') {
                    gmset = true;
                }
                return Promise.all([
                    $store.dispatch('user/getJob'),
                    $store.dispatch('user/getBadRecord')
                ]);
            }).then(() => {
                next(vm => vm.init({isShowOther, gmset}));
            }).catch((error) => {
                next(vm => vm.init());

                throw error;
            });
        },
        mounted () {
            this.otherSave = this.getData.credit_record;
            for (let i = 0; i < this.getBadRecord.length; i++) {
                if (this.getBadRecord[i].dict_desc === this.getData.credit_record) {
                    this.isOther = true;
                }
            }
            if (!this.isOther || this.getData.credit_record === '其他') {
                this.otherTxt = this.getData.credit_record;
                this.getData.credit_record = '其他';
            }
        },
        methods: {
            init (val) {
                this.ethnics = myJson.results;
                this.isShowOther = val.isShowOther;
                this.gmset = val.gmset;
                this.$store.dispatch('user/checkIDCard').then((data) => {
                    if (data && data.error_no !== '0') {
                        this.dialog({
                            content: '您的身份证已过期，请更新身份证后再来办理。',
                            type: '',
                            cancelText: '确定'
                        });
                        this.isExpired = true;
                        return Promise.reject(new Error('您的身份证已过期，请更新身份证后再来办理。'));
                    }
                });
            },
            doneAlert () {
                this.dialogInfo.isShow = false;
                this.updateData();
            },
            closeAlert () {
                this.dialogInfo.isShow = false;
                if (this.isModify) {
                    window.location.reload();
                }
                if (this.isExpired) {
                    this.$router.go(-1);
                }
            },
            dialog (msg) {
                this.dialogInfo.isShow = true;
                this.dialogInfo.title = msg.title ? msg.title : '';
                this.dialogInfo.content = msg.content ? msg.content : '';
                this.dialogInfo.type = msg.type ? msg.type : '';
                this.dialogInfo.cancelText = msg.cancelText ? msg.cancelText : '取消';
            },
            checkInput () {
                let regexp = /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^(13|14|15|16|17|18|19)[0-9]{9}$)/;
                let idcheck = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
                if (!this.getData.address) {
                    this.dialog({
                        content: '联系地址不能为空',
                        type: '',
                        cancelText: '确定'
                    });
                    return false;
                }
                if (this.gmset) {
                    if (!this.getData.sec_relation_name.trim() || !this.getData.sec_relation_phone.trim()) {
                        this.dialog({
                            content: '您已开通创业板权限，需要填写紧急联系人和联系电话',
                            type: '',
                            cancelText: '确定'
                        });
                        return false;
                    }
                    if (!regexp.test(this.getData.sec_relation_phone)) {
                        this.dialog({
                            content: '请输入正确的紧急人联系电话',
                            type: '',
                            cancelText: '确定'
                        });
                        return false;
                    }
                }
                if (!this.getData.profession_code || this.getData.profession_code > 46) {
                    this.dialog({
                        content: '职业不能为空',
                        cancelText: '确定'
                    });
                    return false;
                }
                if (!this.getData.nation_id.trim()) {
                    this.dialog({
                        content: '民族不能为空',
                        cancelText: '确定'
                    });
                    return false;
                }
                if (!this.isShowOther || this.isShowOther === '本人') {
                    this.getData.benefit_person = this.getData.user_name;
                    this.getData.benefit_idno = this.getData.id_no;
                    this.getData.benefit_mobile = this.getData.mobile;
                }
                if (this.isShowOther === '他人') {
                    if (!this.getData.benefit_person || !this.getData.benefit_idno || !this.getData.benefit_mobile) {
                        this.dialog({
                            content: '实际受益人姓名、身份证号、手机号不能为空',
                            cancelText: '确定'
                        });
                        return false;
                    }
                    if (!idcheck.test(this.getData.benefit_idno)) {
                        this.dialog({
                            content: '身份证号码格式不正确',
                            cancelText: '确定'
                        });
                        return false;
                    }
                    if (!regexp.test(this.getData.benefit_mobile)) {
                        this.dialog({
                            content: '请输入正确的实际受益人联系电话',
                            type: '',
                            cancelText: '确定'
                        });
                        return false;
                    }
                }
                if (!this.getData.control_person) {
                    this.getData.control_person = this.getData.user_name;
                }
                if (this.getData.is_credit === '是' && !this.getData.credit_record) {
                    this.dialog({
                        content: '请选择一个不良记录',
                        cancelText: '确定'
                    });
                    return false;
                }
                if (this.getData.is_credit === '否' || !this.getData.is_credit) {
                    this.getData.is_credit = '否';
                    this.getData.credit_record = '';
                }
                if (this.getData.credit_record === '其他') {
                    if (!this.otherTxt) {
                        this.dialog({
                            content: '请填写不良记录',
                            cancelText: '确定'
                        });
                        return false;
                    }
                    this.getData.credit_record = this.otherTxt;
                }
                this.getData.control_person = this.getData.user_name;
                this.dialog({
                    content: '是否确认修改个人资料',
                    type: 'confirm'
                });
            },
            submit () {
                this.checkInput();
            },
            updateData () {
                this.getData.mobile = this.getMobile;
                this.$store.dispatch('user/changeData', this.getData).then((data) => {
                    this.dialog({
                        content: data.error_info,
                        cancelText: '确定'
                    });
                    this.isModify = true;
                });
            },
            controlCheck () {
                this.dialog({
                    content: '根据中国结算账户实名制管理要求，账户需为本人操作',
                    cancelText: '确定'
                });
                this.isChecked = true;
            },
            toPhone () {
                this.getData.credit_record = this.otherSave;
                this.$router.push({ path: '/change_phone' });
            }
        }
    };
</script>
