import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShopppingCartContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../utilities/formatCurrency'

type CartItemProps = {
  id: number
  quantity: number
}
const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find((item) => item.id === id)
  if (item === null) return null

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item?.imgUrl}
        alt=''
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className='me-auto'>
        <div>
          {item?.name}{' '}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '.70rem' }}>
              x{quantity}
            </span>
          )}
        </div>

        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {formatCurrency(item?.price || 0)}
        </div>
      </div>
      <div>{formatCurrency(item?.price || 0 * quantity)}</div>
      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => removeFromCart(item?.id || -1)}>
        &times;
      </Button>
    </Stack>
  )
}

export default CartItem
