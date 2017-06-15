<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家<span>{{seller.rankRate}}</span>%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <div class="title">服务态度</div>
            <star :size="36" :score="seller.serviceScore"></star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="score-wrapper">
            <div class="title">商品评分</div>
            <star :size="36" :score="seller.foodScore"></star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"
                    @select="selectRating" @toggle="toggleContent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import axios from 'axios';
  import {formatDate} from 'common/js/date.js';
  import BScroll from 'better-scroll';

  const ALL = 2;
  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created () {
      var self = this;
      axios.get('api/ratings')
      .then(function (response) {
        response = response.data;
        if (response.erron === ERR_OK) {
          self.ratings = response.data;
          self.$nextTick(() => {
            self._initScroll();
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    methods: {
      selectRating (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {}
        return type === this.selectType;
      },
      _initScroll () {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/mixin.styl'

.ratings
  position:absolute
  top: 177px
  left:0
  bottom:0
  width:100%
  overflow :hidden
  .overview
    padding:18px 0
    display: flex
    .overview-left
      flex:0 0 138px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align:center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        font-size :24px
        line-height: 28px
        color: rgb(255, 153, 0)
        margin-bottom:6px
      .title
        font-size :12px
        line-height :12px
        color: rgb(7, 17, 27)
        margin-bottom :8px
      .rank
        font-size :10px
        line-height: 10px
        color: rgb(147, 153, 159)
    .overview-right
      flex:1
      padding:6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        margin-bottom: 8px
        font-size :0
        height:18px
        .title
          display: inline-block
          vertical-align: top
          font-size :12px
          line-height :18px
          color: rgb(7, 17, 27)
        .star
          display: inline-block
          margin: 0 12px
          vertical-align: top
        .score
          display: inline-block
          vertical-align: top
          font-size :12px
          line-height :18px
          color: rgb(255, 153, 0)


      .delivery-wrapper
        font-size: 0
        .title
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .delivery
          margin-left: 12px
          font-size: 12px
          color: rgb(147, 153, 159)
  .rating-wrapper
    padding:0 18px
    .rating-item
      display: flex
      padding:18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex:0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius:50%
      .content
        flex:1
        position:relative
        .name
          font-size :10px
          line-height :12px
          margin-bottom:4px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom :6px
          font-size:0
          .star
            display: inline-block
            margin-right:6px
          .delivery
            display: inline-block
            font-size :10px
            line-height :12px
            color: rgb(147, 153, 159)

        .text
          font-size: 12px
          line-height :18px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        .recommend
          font-size:0
          line-height :16px
          .icon-thumb_up
            display: inline-block
            font-size: 12px
            color: rgb(0, 160, 220)
            margin-right:8px
          .item
            display: inline-block
            font-size: 9px
            line-height :16px
            color: rgb(147, 153, 159)
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 2px
            background-color :#fff
            margin-right:8px

        .time
          position: absolute
          top:0
          right:0
          font-size :10px
          line-height: 12px
          color: rgb(147, 153, 159)
</style>
