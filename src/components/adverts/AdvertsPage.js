import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Empty,
  Button,
  Spin,
  List,
  Card,
  Statistic,
  Tag,
  Row,
  Col,
  Divider,
  Typography,
  Input,
  Slider,
  Radio,
} from 'antd';

import storage from '../../utils/storage';
import { getAdverts } from '../../api/adverts';
import { formatter } from '../../utils/numbers';
import Layout from '../layout';
import TagsSelect from './TagsSelect';

const tagsColors = {
  motor: 'green',
  mobile: 'orange',
  lifestyle: 'pink',
  work: 'blue',
};

const saleOptions = {
  sell: { label: 'Sell', value: 'sell' },
  buy: { label: 'Buy', value: 'buy' },
  all: { label: 'All', value: 'all' },
};

const defaultFilters = {
  name: '',
  sale: saleOptions.all.value,
  price: [],
  tags: [],
};

class FiltersForm extends React.Component {
  state = {
    ...this.props.initialFilters,
  };

  sliderRef = React.createRef(null);

  handleNameChange = ev => this.setState({ name: ev.target.value });
  handlePriceChange = price => {
    const { current: slider } = this.sliderRef;
    const [min, max] = price;
    if (min === slider.props.min && max === slider.props.max) {
      return this.setState({ price: [] });
    }
    this.setState({ price });
  };
  handleSaleChange = ev => this.setState({ sale: ev.target.value });
  handleTagsChange = tags => this.setState({ tags });

  handleSubmit = ev => {
    const { onSubmit } = this.props;
    ev.preventDefault();
    onSubmit(this.state);
  };

  render() {
    const { name, price, tags, sale } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Name"
          onChange={this.handleNameChange}
          value={name}
        />
        <Slider
          range
          defaultValue={price}
          min={0}
          max={10000}
          onChange={this.handlePriceChange}
          ref={this.sliderRef}
        />
        <TagsSelect onChange={this.handleTagsChange} value={tags} />
        <Radio.Group
          options={Object.values(saleOptions)}
          onChange={this.handleSaleChange}
          value={sale}
        />
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </form>
    );
  }
}

FiltersForm.propTypes = {
  initialFilters: T.shape({
    name: T.string,
    sale: T.oneOf(Object.keys(saleOptions)),
    price: T.arrayOf(T.number),
    tags: T.arrayOf(T.string),
  }),
  onSubmit: T.func.isRequired,
};

FiltersForm.defaultProps = {
  initialFilters: defaultFilters,
};

class AdvertsPage extends React.Component {
  state = {
    adverts: null,
    loading: false,
    error: null,
    filters: storage.get('filters') || defaultFilters,
  };

  getAdverts = () => {
    const { filters } = this.state;
    this.setState({ loading: true, error: null });
    getAdverts(filters)
      .then(({ result }) =>
        this.setState({ loading: false, adverts: result.rows }),
      )
      .catch(error => this.setState({ loading: false, error }));
  };

  handleSubmit = filters => {
    storage.set('filters', filters);
    this.setState({ filters });
  };

  renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  renderError = () => {
    const { error } = this.state;
    return (
      <Empty
        description={
          <span style={{ color: '#ff4d4f' }}>{`Error: ${error}`}</span>
        }
      >
        <Button type="primary" danger onClick={this.getAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  renderEmpty = () => {
    const { filters } = this.state;
    const isFiltered =
      JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create now</Button>
          </Link>
        )}
      </Empty>
    );
  };

  renderAdvert = advert => {
    const headStyle = {
      backgroundColor: advert.sale ? '#f6ffed' : '#fff7e6',
      color: advert.sale ? '#52c41a' : '#fa8c16',
    };
    return (
      <List.Item>
        <Link to={`/adverts/${advert._id}`}>
          <Card
            title={advert.sale ? 'Sell' : 'Buy'}
            headStyle={headStyle}
            hoverable
          >
            <Row>
              <Col span={12}>
                <Typography.Title level={4}>{advert.name}</Typography.Title>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Statistic
                  title="Price"
                  value={advert.price}
                  formatter={formatter}
                />
              </Col>
            </Row>
            <Divider plain></Divider>
            {advert.tags.map(tag => (
              <Tag color={tagsColors[tag]}>{tag}</Tag>
            ))}
          </Card>
        </Link>
      </List.Item>
    );
  };

  renderAdverts = () => {
    const { adverts, loading, error } = this.state;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts.length) {
      return this.renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={this.renderAdvert}
      />
    );
  };

  componentDidMount() {
    this.getAdverts();
  }

  componentDidUpdate(prevProps, { filters: prevFilters }) {
    const { filters } = this.state;
    if (JSON.stringify(filters) !== JSON.stringify(prevFilters)) {
      this.getAdverts();
    }
  }

  render() {
    const { filters } = this.state;
    return (
      <Layout title="Adverts list">
        <FiltersForm initialFilters={filters} onSubmit={this.handleSubmit} />
        {this.renderAdverts()}
      </Layout>
    );
  }
}

AdvertsPage.propTypes = {};

export default AdvertsPage;
