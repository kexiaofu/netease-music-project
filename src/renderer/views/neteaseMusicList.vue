<template>
    <div class="netease-music-list">
        <div class="send-code-part">
            <input type="text" v-model="code" class="code" placeholder="粘贴网易云歌单链接，如：http://music.163.com/playlist?id=416104421">
            <input type="text" v-model="addr" class="code" placeholder="填写保存歌单位置">
            <div class="ok" @click="getMusicList" >{{action}}</div>
        </div>
        <div style="text-align: center;height: 40px;font-size: 20px;" v-if="musicList.length > 0">共{{musicList.length}}首</div>
        <table v-if="musicList.length > 0">
            <tr>
                <th>歌名</th><th>时长</th><th>歌手</th><th>专辑</th>
            </tr>
            <tr v-for="item in musicList">
                <td>{{item.title}}</td>
                <td>{{item.dur}}</td>
                <td>{{item.singer}}</td>
                <td>{{item.album}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  import bat from '../../../static/bat.js';
  export default {
    name: "netease-music-list",
    data() {
      return {
        code:'',
        addr:'',
        getMusicNow:false,
        action:'获取歌单',
        musicList:[]
      }
    },
    methods:{
      getMusicList() {
        if(!this.getMusicNow) {
          if(this.noEmptyBlock(this.code) !== '' && this.noEmptyBlock(this.addr) !== '') {
            this.action = '正在获取歌单';
            this.getMusicNow = true;
            this.musicList = [];
            console.log(this.code,this.addr)
            bat(this.code,this.addr,data=>{
              console.log(data);
              this.action = '获取歌单';
              this.getMusicNow = false;
              this.musicList = JSON.parse(data);
            })
          }
        }

      },

      noEmptyBlock(val) {
        return val.replace(/(\s)/g,'');
      },

      toPage() {
        this.$router.push({
          name:'landingPage'
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .netease-music-list{
        .send-code-part{
            width: 250px;
            margin:100px auto;
        }
        .code{
            border:none;
            border-bottom:1px solid #cdcdcd;
            margin:20px 0;
            width: 250px;
            outline: none;
        }
        .send-code,.ok{
            float:left;
            width: 105px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin:0 10px;
            cursor: pointer;
            border-radius:5px;
        }

        table{
            width: 100%;
            tr{
                text-align: center;
                height: 32px;
            }
        }
    }
</style>