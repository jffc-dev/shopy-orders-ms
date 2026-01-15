import { Controller, Logger, ParseUUIDPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto, PaidOrderDto } from './dto';
import { OrderPaginationDto } from './dto/pagination-order.dto';
import { ChangeOrderStatusDto } from './dto/chage-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  private readonly logger = new Logger(OrdersController.name);

  @MessagePattern({ cmd: 'create_order' })
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    const paymentSession = await this.ordersService.createPaymentSession(order);
    return { order, paymentSession };
  }

  @EventPattern('payment_succeeded')
  paidOrder(@Payload() paidOrderDto: PaidOrderDto) {
    this.logger.log(`Payment succeeded: ${JSON.stringify(paidOrderDto)}`);
    return this.ordersService.updateOrderStatusAfterPayment(paidOrderDto);
    return;
  }

  @MessagePattern({ cmd: 'find_all_orders' })
  findAll(@Payload() paginationDto: OrderPaginationDto) {
    console.log('asdf');
    return this.ordersService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_order' })
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({ cmd: 'change_order_status' })
  changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto);
  }
}
