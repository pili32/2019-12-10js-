<template>
  <div style="height:100%;position:relative;">
    <div>
      <!-- <Form inline :model="queryPar" v-if="queryPar"> -->
      <Form inline >
        <FormItem >
          <Input v-model="title" placeholder="请输入标题或关键字搜索" @on-enter="reload(1)"/>
        </FormItem>
        <FormItem label="通知类型" :label-width="80" style="width:230px">
          <Select v-model="newsType" clearable @on-change="reload(1)">
            <Option value="XZIns">行政机构</Option>
            <Option value="WSIns">卫生机构</Option>
            <Option value="Personal">个人</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="reload(1)">搜索</Button>
          <Button type="primary" @click="onAdd()">新增</Button>
        </FormItem>
      </Form>
    </div>
    <div class="form_lists">
      <div style="height:100%" ref="TableHeight">
        <Table border :columns="columns" :data="data" :loading="loading" :max-height="tableHeight">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="content">
            <div class="action-btn">
              <a @click="look(row)">查看</a>
            </div>
           <!--  <p v-html="row.content"></p> -->
          </template>
           <template slot-scope="{row}" slot="newsType">
             <span>{{row.newsType && row.newsType.replace("XZIns","行政机构").replace("WSIns","卫生机构").replace("Personal","个人")}}</span>
          </template>
          <template slot-scope="{row}" slot="action">
            <div class="action-btn">
              <a @click="edit(row)">编辑</a>
              <a @click="deletes(row.id)">删除</a>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <div style="position:absolute;left:0;bottom:0">
      <Page
        show-total
        show-sizer
        show-elevator
        :page-size="pageSize"
        :total="total"
        :page-size-opts="pageSizeOps"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      />
    </div>

    <!--编辑框-->
    <Modal
      v-model="ModalShow"
      :mask-closable="false"
      width="850"
      class-name="vertical-center-modal">
      <div slot="header" style="color:#333333;font-size:16px">
        <Icon type="md-hammer"></Icon>
        <span>{{handletitle}}</span>
      </div>
      <Form :model="editObje" ref="editValidate" :label-width="80" :rules="editValidate">
        <FormItem label="标题" prop="title">
          <Input v-model="editObje.title" placeholder="标题"/>
        </FormItem>
        <FormItem label="关键字">
          <Input v-model="editObje.keyworks" placeholder="请输入关键字"/>
        </FormItem>
        <FormItem label="来源">
          <Input v-model="editObje.sourceName" placeholder="请输入来源"/>
        </FormItem>
        <FormItem label="来源地址">
          <Input v-model="editObje.sourceAddress" placeholder="请输入来源地址"/>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="类型" prop="newsType" >
              <CheckboxGroup v-model="editObje.newsType">
                  <Checkbox label="XZIns" value="XZIns">行政机构</Checkbox>
                  <Checkbox label="WSIns" value="WSIns" >卫生机构</Checkbox>
                  <Checkbox label="Personal" value="Personal">个人</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
          <Col span="12">
           <FormItem label="是否启用">
              <Checkbox v-model="editObje.enableMark"></Checkbox>
            </FormItem>
          <!--   <FormItem label="业务标识" prop="service_mark">
              <Select v-model="editObje.service_mark">
                <Option value="01">01</Option>
                <Option value="02">02</Option>
              </Select>
            </FormItem> -->
          </Col>
        </Row>
        <FormItem label="内容" prop="content">
          <editor ref="editor" :value="editObje.content" @on-change="handleChange"></editor>
        </FormItem>
        <div style="padding-left:10px;">
          <label>上传附件</label>
          <Upload
             multiple
            ref="upload1"
            :show-upload-list="false"
            name="file"
            :data="uploadDataPar"
            :on-success="handleSuccess1"
            :max-size="2048"
            :on-format-error="handleFormatError1"
            :on-exceeded-size="handleMaxSize1"
            :action="UPLOAD_API_HOST"
            style="display: inline-block;width:58px;padding-left:15px;">
           <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
        </div>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancleSubmit()">取消</Button>
        <Button type="primary" size="large" @click="createExt('editValidate')">确定</Button>
      </div>
    </Modal>

    <Modal
        title="查看内容"
        v-model="LookModal"
        :footer-hide="true"
        :mask-closable="false" draggable>
         <Form :label-width="85" v-if="lookObject" style="margin-bottom: 20px;">
           <Row>
             <Col :span="12">
                  <FormItem label="标题：">{{lookObject.title}}</FormItem>
             </Col>
             <Col :span="12">
                  <FormItem label="来源：">{{lookObject.sourceName}}</FormItem>
             </Col>
           </Row>
            <Row>
             <Col :span="12">
                  <FormItem label="启用状态：">{{lookObject.enableMark}}</FormItem>
             </Col>
             <Col :span="12">
                <FormItem label="来源地址：">{{lookObject.sourceAddress}}</FormItem>
             </Col>
           </Row>
           <FormItem label="内容：">
             <p v-html="lookObject.content"></p>
           </FormItem>
           
         </Form>
    </Modal>
  </div>
</template>
<style lang="less" scoped>
  .form_lists{
    height:calc(100% - 60px);
    overflow: hidden;
    padding-bottom: 38px;
    box-sizing: border-box;
  }
</style>
<script>
import { Add,PageList,deleteNews,editNews} from "@/service/newNotice"
import { getAccessToken,urlPath, validateSequence, getUserInfo } from "@/libs/util";
import { Modal, Message } from "iview";
import Editor from "@/components/editor/editor.vue";
export default {
  data() {
    return {
      loading: false,
      LookModal:false,
      tableHeight: 520,
      actionurl: "",
      columns: [
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "类型",
          slot: "newsType"
        },
        {
          title: "内容",
          width: 80,
          slot: "content"
        },
        {
          title: "关键字",
          key: "keyworks"
        },
        {
          title: "来源",
          key: "sourceName"
        },
        {
          title: "浏览量",
          key: "pv"
        },
        {
          title: "发布时间",
          key: "create_date"
        }
      ],
      data: [],
      total: 0,
      handletitle:"编辑",
      pageIndex: 0,
      pageSize: 15,
      //主体编辑
      ModalShow: false,
      editObje: {},
      lookObject:{},
      //查询参数定义
        title: null,
        keyWord: null,
        newsType:'',
      uploadDataPar: {
        file_type: ""
      },
      editValidate: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        newsType: [
          { required: true,type: 'array', min: 1, message: '请选择类型', trigger: 'change' }
        ],
        content:[
          {required: true, message: "请输入内容", trigger: "blur"}
        ]
      }
    };
  },
  components:{
    Editor
  },
  created() {
    this.pageSizeOps = [15, 30, 50, 100];
    let userNew = getUserInfo();
    this.userNew = userNew;
    this.uploadDataPar = {
      file_type: "PersonalConfig"
    };
    this.actionurl =
      process.env.COMMON_API_HOST +
      "pub/upload?access_token=" +
      getAccessToken();
      //  if(res.data=10000){
      //    console.log(res.datas)
      //  }
    this.reload();
  },
  mounted() {
    //计算table的高度
    this.$nextTick(() => {
      let tableHeight = this.$refs.TableHeight.offsetHeight;
      this.tableHeight = tableHeight;
    });
  },
  methods: {
    reload(page) {
      if(page != undefined)
      {
        this.pageIndex = page;
      }
      // this.loading = true;
      //查询相关参数
      console.log(this.title,)
      let params = {
        page:{
          pageNum: this.pageIndex,
          pageSize: this.pageSize,
        },
          title: this.title,
          newsType: this.newsType,
          keyWord:this.keyWord,
      };
      // this.getCommonApiRequest("news/list", urlPath(params)).then(res => {
      //   if (res.data.data) {
      //     this.total = res.data.data.total_count;
      //     let resData = res.data.data.items;
      //     if (resData) {
      //       this.data = resData;
      //     }
      //   }
      //   this.loading = false;
      // });
      //通知列表分页
      console.log(params)
      PageList(params).then(res=>{
        if(res.code==10000){
          this.total = res.datas.total_count;
          this.data = res.datas
        }
      })
    },
    onPageChange(num) {
      this.pageIndex = num;
      this.reload();
    },
    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.reload();
    },
    //点开编辑页面时数据源初步渲染
    edit(row) {
      this.editObje = {
        id: row.id,
        // newsType: row.newsType,
        service_mark: row.service_mark,
        title: row.title,
        content: row.content,
        keyworks: row.keyworks,
        sourceName: row.sourceName,
        sourceAddress:row.sourceAddress,
        create_userid:row.create_userid,
        create_username:row.create_username,
        file1:row.file1,
        enableMark: row.enableMark == 1 ? true : false
      };
      console.log( this.editObje)
      this.$refs.editor.setHtml(this.editObje.content);
      // this.editObje.newsType=this.editObje.newsType.split(',');
      this.$refs["editValidate"].resetFields();
      this.handletitle="编辑";
      this.ModalShow = true;
    },
    //删除
    deletes(id) {
      let Id = id 
      Modal.confirm({
        title: "删除",
        content: "<p>确定要删除？</p>",
        onOk: () => {
       let params={
         id:Id
       }
        deleteNews(params).then(res=>{
          if(res.code==10000){
              Message.success("删除成功!");
              this.reload();
               } else {
              Message.error(res.data.msg);
          }
        })
        }
      });
    },
    //新增按钮点击事件
    onAdd() {
      this.handletitle="新增";
      this.$refs["editValidate"].resetFields();
      this.editObje = {};
      this.editObje.service_mark="01";
      this.editObje.enableMark = true;
      this.ModalShow = true;
    },
    cancleSubmit() {
      this.$refs["editValidate"].resetFields();
      this.ModalShow = false;
    },
    //编辑页面
    createExt(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {
            id: this.editObje.id,
            newsType: this.editObje.newsType.join(','),
            service_mark: this.editObje.service_mark,
            title: this.editObje.title,
            content: this.editObje.content,
            keyworks: this.editObje.keyworks,
            sourceName: this.editObje.sourceName,
            sourceAddress: this.editObje.sourceAddress,
            create_userid: this.editObje.create_userid,
            create_username: this.editObje.create_username,
            // file1:this.editObje.file1,
            file1:1212,
            pv:this.pv,
            enableMark: this.editObje.enableMark ? 1 : 0
          };
          console.log(params)
          if (this.editObje.id) {
            // this.UpData("news", params);
            editNews(params).then(res=>{
              if(res.code=100000){
              this.ModalShow = false;
              Message.success("保存成功!");
             this.reload();
              }else{
                Message.error(res.data.msg);
              }
            })
          } else {
            // this.PostData("news", params);
               Add(params).then(res=>{
              if(res.code=100000){
                console.log(1)
              this.ModalShow = false;
              Message.success("保存成功!");
             this.reload();
              }else{
                Message.error(res.data.msg);
              }
            })
            
          }
        }
      });
      this.ModalShow = false;

    },
    // UpData(url, param) {
    //   //更新数据
    //   this.editNews(url, param).then(res => {
    //     if (res.data.code == 40000) {
    //       this.ModalShow = false;
    //       Message.success("保存成功!");
    //       this.reload();
    //     } else {
    //       Message.error(res.data.msg);
    //     }
    //   });
    // },
    // PostData(url, param) {
    //   //写入数据
    //   this.postCommonApiRequest(url, param).then(data => {
    //     if (data.data.code == 40000) {
    //       this.ModalShow = false;
    //       Message.success("保存成功!");
    //       this.reload();
    //     } else {
    //       Message.error(data.data.msg);
    //     }
    //   });
    // },
    //文件上传成功时的钩子，返回字段为 response, file, fileList
    handleSuccess1(res, file) {
      if (res.code == 40000) {
        this.editObje.img = res.data;
        Message.success("上传成功!");
      } else {
        Message.error(res.msg);
      }
    },
    //文件格式验证失败时的钩子，返回字段为 file, fileList
    handleFormatError1(file) {
      Message.error("File format of " +
          file.name +
          " is incorrect, please select jpg or png.");
    },
    //获得上传文件的路径

    //文件超出指定大小限制时的钩子，返回字段为 file, fileList
    handleMaxSize1(file) {
      Message.error("File  " + file.name + " is too large, no more than 2M.");
    },
    handleChange(html,text){
      if(html)
        this.editObje.content=html;
    },
    look(row){
      this.lookObject = {
        newsType: row.newsType,
        service_mark: row.service_mark,
        title: row.title,
        content: row.content,
        keyworks: row.keyworks,
        sourceName: row.sourceName,
        sourceAddress:row.sourceAddress,
        file1:row.file1,
        enableMark: row.enableMark == 1 ? "是" : "否"
      };
      this.LookModal=true;
    }
  }
};
</script>