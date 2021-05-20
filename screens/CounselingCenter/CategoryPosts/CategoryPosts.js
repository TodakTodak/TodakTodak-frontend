import React from "react";
import {
  FlatList,
  ScrollView,
  RefreshControl
} from "react-native";

import EmptyView from "../../../components/EmptyView/EmptyView";

import styles from "../styles";

const CategoryPosts = ({
  post,
  category,
  getCategorys,
  refreshCategory,
  renderCategoryPosts
}) => {
  return (
    <>
      {0 < post[category].length
        ? <FlatList
            refreshControl={
              <RefreshControl onRefresh={refreshCategory} />
            }
            data={post[category]}
            onEndReached={getCategorys}
            onEndReachedThreshold={0.9}
            styles={styles.postsWrapper}
            renderItem={renderCategoryPosts}
            keyExtractor={(item) => item._id}
          />
        : <ScrollView
            contentContainerStyle={styles.emptyContainer}
            refreshControl={
              <RefreshControl onRefresh={refreshCategory} />
            }
          >
            <EmptyView
              text="해당 카테고리의 고민이 없습니다."
              viewStyle={styles.emptyContainer}
            />
          </ScrollView>
      }
    </>
  );
};

export default CategoryPosts;
