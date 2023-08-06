import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Layout, Rect} from '@motion-canvas/2d/lib/components';
import {makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import {all, loop, sequence} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const random = useRandom();
  const rects: Rect[] = [];

  view.add(
    <Layout layout gap={10} alignItems="center">
      {range(90).map(i => (
        <Rect
          ref={makeRef(rects, i)}
          radius={5}
          width={10}
          height={10}
          fill={'#54a45c'}
        />
      ))}
    </Layout>,
  );

  yield* loop(1, () =>
    sequence(
      0.02,
      ...rects.map(rect =>
        all(
          rect.size.y(random.nextInt(100, 200), 0.5).to(10, 0.5),
          rect.fill('#42D336', 0.5).to('#54a45c', 0.5),
        ),
      ),
    ),
  );
  
});
