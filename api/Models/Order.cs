using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Stateless;

namespace Ctrip.API.Models
{
    // 状态
    public enum OrderStateEnum
    {
        Pending, // 订单已生成
        Processing, // 支付处理中
        Completed, // 交易成功
        Declined, // 交易失败
        Cancelled, // 订单取消
        Refound, // 已退款
    }

    // 触发事件
    public enum OrderStateTriggerEnum
    {
        PlaceOrder, // 支付
        Approve, // 支付成功
        Reject, // 支付失败
        Cancel, // 取消
        Return, // 退货
    }

    public class Order
    {
        public Order()
        {
            StateMachineInit();
        }
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }

        // User是数据库外键对象，所以它不会参与数据库结构的创建
        public ApplicationUser User { get; set; }
        public ICollection<LineItem> OrderItems { get; set; }

        public OrderStateEnum State { get; set; }
        public DateTime CreateDateUTC { get; set; }

        public string TransactionMetadata { get; set; }

        StateMachine<OrderStateEnum, OrderStateTriggerEnum> _machine;

        private void StateMachineInit()
        {
            // 配置状态机初始化状态
            _machine = new StateMachine<OrderStateEnum, OrderStateTriggerEnum>(OrderStateEnum.Pending);

            // 配置触发动作以及状态转换
            _machine.Configure(OrderStateEnum.Pending)
                .Permit(OrderStateTriggerEnum.PlaceOrder, OrderStateEnum.Processing)
                .Permit(OrderStateTriggerEnum.Cancel, OrderStateEnum.Cancelled);

            _machine.Configure(OrderStateEnum.Processing)
                .Permit(OrderStateTriggerEnum.Approve, OrderStateEnum.Completed)
                .Permit(OrderStateTriggerEnum.Reject, OrderStateEnum.Declined);

            _machine.Configure(OrderStateEnum.Declined)
                .Permit(OrderStateTriggerEnum.PlaceOrder, OrderStateEnum.Processing);

            _machine.Configure(OrderStateEnum.Completed)
                .Permit(OrderStateTriggerEnum.Return, OrderStateEnum.Refound);
        }
    }
}
