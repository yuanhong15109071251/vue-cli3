<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="leftWrapper">
        <ul ref="leftUl">
          <!--currentIndex 当前分类项   -->
          <li
            class="menu-item"
            v-for="(good,index) in goods"
            :key="good.name"
            :class="{current:currentIndex===index}"
            @click="clickItem(index)"
          >
            <span class="text bottom-border-1px">
              <img v-if="good.icon" class="icon" :src="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="rightWrapper">
        <ul ref="rightUl">
          <!-- 标识这个ul 为了快速找到ul 找到其里面的li-->
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods" :key="food.name">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food='food'/>
                    </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "ShopGoods",
  data() {
    return {
      scrollY: 0, // 右侧滑动的坐标 初始值为0 滑动时更新 为正值
      tops: [] // 右侧所有分类li的top数组 列表显示之后统计tops
    };
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    //当前分类 的下标
    currentIndex() {
      //初始时要调用一次
      //取出数据
      const { scrollY, tops } = this;
      //最新的下标 可能和当前相同也可能不同 要知道当前是几
      const index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      );
      //判断index变化
      if (index !== this.index && this.leftScroll) {
        //保存 这个是最新的
        this.index = index;
        //在当前 分类发生变化时 让右侧列表滑动到对应的位置
        //拿到左侧所有的ul 下的li
        const li = this.$refs.leftUl.children[index];
        this.leftScroll.scrollToElement(li,300);
      }
      return index;
    }
  },
  watch: {
    goods() {
      //this.$nextTick()调用说明数据改变了 里面那个函数调用说明已经更新了
      this.$nextTick(() => {
        //列表显示之后才调
        this.initScroll();
        this.initTops();
      });
    }
  },
  methods: {
    //初始化滚动
    initScroll() {
      this.leftScroll = new BScroll(this.$refs.leftWrapper, {
        click: true //标记分发点击事件
      });
      this.rightScroll = new BScroll(this.$refs.rightWrapper, {
        // probeType: 3  //触摸/惯性/编码  高频实时
        // probeType: 2  //触摸 高频实时
        probeType: 1 //触摸  低频 非实时 要触摸一定的时间才触发 假如触摸的时间小于间隔的时间不会触发
      });
      //绑定滚动的监听 停下来的时候
      this.rightScroll.on("scroll", ({ x, y }) => {
        console.log(x, y);
        this.scrollY = Math.abs(y);
      });
      //绑定滚动结束的监听 停下来的时候
      this.rightScroll.on("scrollEnd", ({ x, y }) => {
        console.log(x, y);
        this.scrollY = Math.abs(y);
      });
    },
    //初始化当前所有分类的数组
    initTops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      //遍历所有右侧所有分类li
      const lis = this.$refs.rightUl.children;
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      //重新赋值给tops 状态数据里就有数据了
      this.tops = tops;
      console.log("tops", tops);
    },
    clickItem(index) {
      //当前滑动的位置
      const top = this.tops[index];
      //让当前分类项滑动到对应位置 左侧分类选中变了说明currentIndex变了说明scrollY变了
      this.scrollY = top;
      //要让右侧列表滑动到对应的位置
      this.rightScroll.scrollTo(0, -top, 300);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 225px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
