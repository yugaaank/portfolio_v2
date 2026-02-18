import { forwardRef } from 'react';

const ThankYou = forwardRef((props, ref) => {
  return (
    <div className="ty-stage" ref={ref}>
      <div className="ty-counter">05 / End</div>
      <h2 className="ty-headline">
        THANK
        <br />
        YOU
        <br />
        <em>for visiting.</em>
      </h2>
      <p className="ty-sub">
        Every product starts as an idea. I build the ones that refuse to stay ideas.
      </p>
      <div className="ty-foot">
        <span className="ty-copy">© 2026 Yugaank Rathore</span>
        <div className="ty-links">
          <a href="https://github.com/yugaaank" target="_blank">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
  );
});

ThankYou.displayName = 'ThankYou';

export default ThankYou;
